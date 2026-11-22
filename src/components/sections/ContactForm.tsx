"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { useContactPreset } from "@/components/providers/AppProviders";
import { Button } from "@/components/ui/Button";
import { contact, workTypes } from "@/content";
import { whatsappHref } from "@/config/site";
import { track } from "@/lib/analytics";

type FieldName = "name" | "contact" | "type" | "deadline" | "comment";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const FIELD_ORDER: FieldName[] = ["name", "contact", "type", "deadline", "comment"];
const E = contact.errors;

function validate(v: Values): Errors {
  const errors: Errors = {};

  const name = v.name.trim();
  if (!name) errors.name = E.nameEmpty;
  // Допустимы буквы любого алфавита, пробелы, дефис, апостроф и точка (инициалы)
  else if (!/^\p{L}[\p{L}\s'’.-]*$/u.test(name)) errors.name = E.nameFormat;

  if (!v.contact.trim()) errors.contact = E.contactEmpty;
  if (!v.type) errors.type = E.typeEmpty;

  return errors;
}

function buildMessage(v: Values): string {
  const dash = "—";
  return [
    contact.messageIntro,
    `Имя: ${v.name.trim()}`,
    `Контакт: ${v.contact.trim()}`,
    `Тип работы: ${v.type}`,
    `Срок: ${v.deadline.trim() || dash}`,
    `Комментарий: ${v.comment.trim() || dash}`,
  ].join("\n");
}

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  errorId: string;
  className?: string;
  children: ReactNode;
}

function FieldShell({ id, label, error, errorId, className, children }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label mb-2 block">
        {label}
      </label>
      <div className="field-wrap">{children}</div>
      {/* Сообщение связано с полем через aria-describedby; озвучивает его единый alert формы */}
      <p id={errorId} className="flex min-h-[22px] items-start gap-2 pt-1.5 text-[14px] font-medium leading-[1.4] text-error">
        {error && (
          <>
            <span
              aria-hidden="true"
              className="mt-px grid size-4 shrink-0 place-items-center border border-error font-mono text-[11px] font-bold leading-none"
            >
              !
            </span>
            <span>{error}</span>
          </>
        )}
      </p>
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const { presetType } = useContactPreset();
  const [values, setValues] = useState<Values>({
    name: "",
    contact: "",
    type: "",
    deadline: "",
    comment: "",
  });
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [seenNonce, setSeenNonce] = useState(0);
  // Счётчик неудачных отправок: фокус переводим в эффекте, уже после коммита aria-invalid/aria-describedby
  const [focusTick, setFocusTick] = useState(0);
  const focusTarget = useRef<FieldName | null>(null);
  const refs = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});

  // Предвыбор типа работы по клику на услугу
  if (presetType && presetType.nonce !== seenNonce) {
    setSeenNonce(presetType.nonce);
    setValues((v) => ({ ...v, type: presetType.value }));
    setTouched((t) => ({ ...t, type: true }));
  }

  const errors = validate(values);
  const showError = (f: FieldName) => (touched[f] || submitted ? errors[f] : undefined);
  const ids = (f: FieldName) => ({ id: `${uid}-${f}`, errorId: `${uid}-${f}-error` });

  const setField =
    (f: FieldName) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setValues((v) => ({ ...v, [f]: value }));
      if (f === "type") setTouched((t) => ({ ...t, type: true }));
    };

  const onBlur = (f: FieldName) => () => setTouched((t) => ({ ...t, [f]: true }));

  const aria = (f: FieldName) => {
    const hasError = Boolean(showError(f));
    return {
      "aria-invalid": hasError ? (true as const) : undefined,
      "aria-describedby": hasError ? ids(f).errorId : undefined,
    };
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    const firstInvalid = FIELD_ORDER.find((f) => errors[f]);
    if (firstInvalid) {
      setAlertText("");
      // Alert нужен, только если ошибка поля ещё не показывалась: иначе фокус на поле
      // уже прочитает её через aria-describedby, и текст прозвучал бы дважды.
      // Очищаем и ставим текст в следующем кадре, чтобы повтор той же ошибки озвучивался снова.
      if (!touched[firstInvalid]) {
        const message = errors[firstInvalid] ?? "";
        requestAnimationFrame(() => setAlertText(message));
      }
      focusTarget.current = firstInvalid;
      setFocusTick((n) => n + 1);
      return;
    }
    setAlertText("");

    // Цель шлём синхронно и до window.open: после открытия окна страница может потерять фокус
    track("lead_submit");
    // Открываем окно синхронно в обработчике клика, иначе его блокируют браузеры
    window.open(whatsappHref(buildMessage(values)), "_blank", "noopener");
  };

  useEffect(() => {
    if (focusTick === 0 || !focusTarget.current) return;
    refs.current[focusTarget.current]?.focus();
  }, [focusTick]);

  const f = contact.fields;

  return (
    <form noValidate onSubmit={onSubmit} aria-label={contact.title}>
      <div role="alert" className="sr-only">
        {alertText}
      </div>

      <div className="grid gap-x-8 gap-y-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <FieldShell {...ids("name")} label={f.name.label} error={showError("name")}>
          <input
            ref={(el) => {
              refs.current.name = el;
            }}
            id={ids("name").id}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={f.name.placeholder}
            value={values.name}
            onChange={setField("name")}
            onBlur={onBlur("name")}
            {...aria("name")}
            className="field"
          />
        </FieldShell>

        <FieldShell {...ids("contact")} label={f.contact.label} error={showError("contact")}>
          <input
            ref={(el) => {
              refs.current.contact = el;
            }}
            id={ids("contact").id}
            name="contact"
            type="text"
            autoComplete="off"
            placeholder={f.contact.placeholder}
            value={values.contact}
            onChange={setField("contact")}
            onBlur={onBlur("contact")}
            {...aria("contact")}
            className="field"
          />
        </FieldShell>

        <FieldShell {...ids("type")} label={f.type.label} error={showError("type")}>
          <select
            ref={(el) => {
              refs.current.type = el;
            }}
            id={ids("type").id}
            name="type"
            value={values.type}
            onChange={setField("type")}
            onBlur={onBlur("type")}
            {...aria("type")}
            className={`field cursor-pointer appearance-none pr-8 ${values.type ? "" : "text-ink-soft"}`}
          >
            <option value="" disabled>
              {f.type.placeholder}
            </option>
            {workTypes.map((t) => (
              <option key={t} value={t} className="text-navy-800">
                {t}
              </option>
            ))}
          </select>
          <span aria-hidden="true" className="select-arrow" />
        </FieldShell>

        <FieldShell {...ids("deadline")} label={f.deadline.label}>
          <input
            ref={(el) => {
              refs.current.deadline = el;
            }}
            id={ids("deadline").id}
            name="deadline"
            type="text"
            autoComplete="off"
            maxLength={100}
            placeholder={f.deadline.placeholder}
            value={values.deadline}
            onChange={setField("deadline")}
            className="field"
          />
        </FieldShell>

        <FieldShell
          {...ids("comment")}
          label={f.comment.label}
          className="sm:col-span-2 lg:col-span-1 xl:col-span-2"
        >
          <textarea
            ref={(el) => {
              refs.current.comment = el;
            }}
            id={ids("comment").id}
            name="comment"
            rows={4}
            placeholder={f.comment.placeholder}
            value={values.comment}
            onChange={setField("comment")}
            className="field field-area"
          />
        </FieldShell>
      </div>

      <div className="mt-4">
        <Button type="submit" size="lg" arrow className="w-full sm:w-auto sm:min-w-[280px]">
          {contact.submit}
        </Button>
        <div className="mt-6 max-w-[52ch] space-y-3 text-small text-ink-soft">
          <p>{contact.hint}</p>
          <p>{contact.consent}</p>
        </div>
      </div>
    </form>
  );
}
