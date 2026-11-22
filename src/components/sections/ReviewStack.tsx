"use client";

import Image, { type StaticImageData } from "next/image";
import { animate, motion, motionValue, useTransform, type MotionValue, type PanInfo } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pen } from "@/components/ui/Pen";
import { reviews } from "@/content";
import { cssVars } from "@/lib/utils";
import r01 from "@/assets/reviews/review-01.webp";
import r02 from "@/assets/reviews/review-02.webp";
import r03 from "@/assets/reviews/review-03.webp";
import r04 from "@/assets/reviews/review-04.webp";
import r05 from "@/assets/reviews/review-05.webp";
import r06 from "@/assets/reviews/review-06.webp";
import r07 from "@/assets/reviews/review-07.webp";
import r08 from "@/assets/reviews/review-08.webp";
import r09 from "@/assets/reviews/review-09.webp";
import r10 from "@/assets/reviews/review-10.webp";
import r11 from "@/assets/reviews/review-11.webp";
import r12 from "@/assets/reviews/review-12.webp";

/** Порядок совпадает с reviews.items */
const IMAGES: StaticImageData[] = [r01, r02, r03, r04, r05, r06, r07, r08, r09, r10, r11, r12];
const N = IMAGES.length;
/** Самая широкая вырезка: от неё CSS считает общий масштаб, чтобы она влезала в колонку */
const WMAX = Math.max(...IMAGES.map((im) => im.width));
/** Наклон вклейки и скотча, градусы: вручную, чтобы стопка выглядела одинаково на сервере и клиенте */
const ROT = [-2.5, 1.8, -1.2, 2.4, -2, 1.2, -1.6, 2.2, -2.3, 1.5, -0.8, 2.5];
const TAPE = [-3, 2, -1.5, 3.5, -2.5, 1.5, -3.5, 2.5, -1, 3, -2, 1];
/** Видимых листов в стопке; остальные прозрачны и лежат снизу */
const VISIBLE = 4;
const AUTO_MS = 5500;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

const LETTER = reviews.railLetter;

function srText(i: number): string {
  const it = reviews.items[i];
  const parts = [`${reviews.figPrefix}${i + 1} ${reviews.of} ${N}.`, it.text];
  if (it.reply) parts.push(`${reviews.ourReply}: ${it.reply}`);
  if (it.translation) parts.push(`${reviews.translationPrefix}: ${it.translation}`);
  return parts.join(" ");
}

/**
 * Сдвиг листа по x. true — доехал, false — анимацию остановили (например, лист схватили).
 * Промис самого animate() при остановке не выполняется, поэтому ждём onComplete или onStop.
 */
function slide(x: MotionValue<number>, to: number, duration: number, ease: readonly number[]): Promise<boolean> {
  return new Promise((resolve) => {
    animate(x, to, {
      duration,
      ease: [...ease] as [number, number, number, number],
      onComplete: () => resolve(true),
      onStop: () => resolve(false),
    });
  });
}

interface CardProps {
  i: number;
  depth: number;
  x: MotionValue<number>;
  done: boolean;
  /** Лист улетает: тянуть нельзя, иначе drag остановит полёт посередине */
  locked: boolean;
  onGrab: () => void;
  onThrow: (side: -1 | 1) => void;
}

/** Одна вклейка: лист, скотч, скриншот, подпись «Рис. А.N». Тянуть можно только верхнюю. */
function Card({ i, depth, x, done, locked, onGrab, onThrow }: CardProps) {
  const rotate = useTransform(x, [-480, 0, 480], [-14, 0, 14]);
  const img = IMAGES[i];
  const item = reviews.items[i];
  const isTop = depth === 0;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const dx = info.offset.x;
    const vx = info.velocity.x;
    if (Math.abs(dx) > 80 || Math.abs(vx) > 500) {
      onThrow(dx + vx * 0.1 < 0 ? -1 : 1);
    } else {
      animate(x, 0, { type: "spring", stiffness: 520, damping: 34 });
    }
  };

  return (
    <li
      className="rv-card"
      data-depth={depth < VISIBLE ? depth : "x"}
      data-done={done ? "" : undefined}
      style={cssVars({
        "--w": img.width,
        "--rot": `${ROT[i]}deg`,
        "--tape": `${TAPE[i]}deg`,
        "--z": N - depth,
      })}
    >
      <motion.div
        className="rv-sheet"
        style={{ x, rotate }}
        drag={isTop && !locked ? "x" : false}
        dragMomentum={false}
        onDragStart={onGrab}
        onDragEnd={onDragEnd}
      >
        <span className="rv-tape" />
        <span className="rv-check">
          <Pen kind="check" delay={220} duration={400} className="inset-0 size-full" />
        </span>
        <Image src={img} alt="" unoptimized draggable={false} className="rv-img" />
        <p className="rv-cap">
          {reviews.figPrefix}
          {i + 1} — {reviews.source}
        </p>
        {item.translation ? (
          <p className="rv-tr">
            {reviews.translationPrefix}: «{item.translation}»
          </p>
        ) : null}
      </motion.div>
    </li>
  );
}

/**
 * Приложение А: стопка вклеек с отзывами (design.md 4.16).
 * Верхний лист смахивается или улетает по кнопке и уходит под стопку.
 * Автолистание 5,5 с, пока стопка в виде; пауза при наведении и фокусе, навсегда после ручного действия.
 * reduced-motion: CSS раскладывает те же листы коллажем, кнопки скрыты, автолистания нет.
 */
export function ReviewStack() {
  const [xs] = useState(() => IMAGES.map(() => motionValue(0)));
  const [top, setTop] = useState(0);
  const [auto, setAuto] = useState(true);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const [flying, setFlying] = useState(false);
  const [msg, setMsg] = useState("");

  const topRef = useRef(0);
  const busy = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLOListElement>(null);

  const flyDist = () => (stackRef.current?.offsetWidth ?? 480) * 0.7 + 60;

  const show = (t: number) => {
    topRef.current = t;
    setTop(t);
  };

  /** dir 1: верхний лист улетает в сторону side и уходит вниз; dir -1: нижний лист возвращается наверх */
  const go = useCallback(
    async (dir: 1 | -1, side: -1 | 1, byUser: boolean): Promise<boolean> => {
      if (busy.current) return false;
      busy.current = true;
      const cur = topRef.current;
      const target = (cur + dir + N) % N;
      if (byUser) setAuto(false);

      if (dir === 1) {
        const x = xs[cur];
        setFlying(true);
        let flew = false;
        try {
          flew = await slide(x, side * flyDist(), 0.3, EASE_OUT);
        } finally {
          setFlying(false);
          busy.current = false;
        }
        // Полёт прервал drag (лист схватили в первый кадр, до locked): лист остаётся верхним,
        // x вернёт или бросит onDragEnd, а busy уже снят, так что бросок сработает
        if (!flew) return true;
        show(target);
        if (byUser) setMsg(srText(target));
        // Лист уже под стопкой (z-index и прозрачность из CSS), возвращается на место
        void slide(x, 0, 0.5, EASE_IN_OUT);
      } else {
        const x = xs[target];
        x.set(side * flyDist());
        show(target);
        busy.current = false;
        if (byUser) setMsg(srText(target));
        void slide(x, 0, 0.5, EASE_OUT);
      }
      return true;
    },
    [xs],
  );

  // В виде ли стопка: автолистание только тогда; первая галочка рисуется при первом показе
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || held || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) void go(1, -1, false);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [auto, held, inView, top, go]);

  const stopAuto = useCallback(() => setAuto(false), []);
  // Если бросок не начался (идёт другой переход), лист не должен остаться сдвинутым
  const onThrow = useCallback(
    (side: -1 | 1) => {
      const x = xs[topRef.current];
      void go(1, side, true).then((started) => {
        if (!started) void slide(x, 0, 0.3, EASE_OUT);
      });
    },
    [go, xs],
  );

  return (
    <div
      ref={rootRef}
      className="rv-body"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHeld(false)}
      onFocus={(e) => {
        // Пауза только при фокусе с клавиатуры: касание кнопки тоже оставляет на ней фокус,
        // а pointerleave у касаний паузу не снимает, и «Запустить» ничего бы не запускала
        let keyboard = true;
        try {
          keyboard = e.target.matches(":focus-visible");
        } catch {
          // браузер без :focus-visible: держим паузу, как раньше
        }
        if (keyboard) setHeld(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      <ol ref={stackRef} className="rv-stack" aria-hidden="true" style={cssVars({ "--wmax": WMAX })}>
        {IMAGES.map((_, i) => {
          const depth = (i - top + N) % N;
          return (
            <Card
              key={i}
              i={i}
              depth={depth}
              x={xs[i]}
              done={seen && depth === 0}
              locked={flying && depth === 0}
              onGrab={stopAuto}
              onThrow={onThrow}
            />
          );
        })}
      </ol>

      <div className="rv-panel">
        <p className="rv-count" aria-hidden="true">
          <span className="rv-no">
            {LETTER}.{top + 1}
          </span>
          <span className="label rv-of">
            {reviews.of} {N}
          </span>
        </p>

        <div className="rv-ctrls">
          <button type="button" className="rv-btn" aria-label={reviews.prev} onClick={() => void go(-1, -1, true)}>
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <path d="M17 10H4M9 4.5 3.5 10 9 15.5" />
            </svg>
          </button>
          <button
            type="button"
            className="rv-btn"
            aria-label={auto ? reviews.pause : reviews.play}
            onClick={() => setAuto((a) => !a)}
          >
            {auto ? (
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M7 4v12M13 4v12" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M6 3.5v13L16.5 10z" className="rv-fill" />
              </svg>
            )}
          </button>
          <button type="button" className="rv-btn" aria-label={reviews.next} onClick={() => void go(1, -1, true)}>
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <path d="M3 10h13M11 4.5 16.5 10 11 15.5" />
            </svg>
          </button>
        </div>

        <p className="rv-hint note" aria-hidden="true">
          {reviews.hint}
        </p>
      </div>

      <p className="sr-only" aria-live="polite">
        {msg}
      </p>
    </div>
  );
}
