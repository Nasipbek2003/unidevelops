"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { header, navItems } from "@/content";
import { telegramHref, whatsappHref } from "@/config/site";
import { cssVars } from "@/lib/utils";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Переход к секции: скролл (плавность задаёт CSS) и фокус в целевую секцию. */
function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView();
  el.focus({ preventScroll: true });
  history.replaceState(null, "", `#${id}`);
}

/** Пункты 6 и 7 (FAQ, Контакты) в шапке только с 1280; на 1024–1279 они в кнопке, подвале и мобильном меню */
const HIDDEN_BELOW_XL = 5;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Линия под шапкой: булево, setState только при смене значения
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const raf = requestAnimationFrame(onScroll); // страница может открыться уже прокрученной
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Scroll-spy
  useEffect(() => {
    const ids = ["hero", ...navItems.map((n) => n.id)];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const next = entry.target.id === "hero" ? null : entry.target.id;
            setActive((prev) => (prev === next ? prev : next));
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Блокировка прокрутки, Esc, автозакрытие при переходе на десктоп, фокус в диалог
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mql.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onChange);
    };
  }, [open]);

  const trapTab = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !menuRef.current) return;
    const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  const closeToSection = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    // нет секции (страница 404): обычный переход по ссылке /#id на главную
    if (!document.getElementById(id)) return;
    e.preventDefault();
    setOpen(false);
    // после коммита закрытия (снят scroll lock) скроллим и переводим фокус в секцию
    requestAnimationFrame(() => goTo(id));
  };

  return (
    <>
      <header
        className="group fixed inset-x-0 top-0 z-50 h-14 bg-paper lg:h-16"
        data-scrolled={scrolled ? "" : undefined}
      >
        <div className="wrap flex h-full items-center justify-between">
          <Link href="/#hero" aria-label="UNIDEVELOPS" className="inline-flex h-11 items-center">
            <Logo markClassName="h-7 lg:h-9" wordClassName="text-[15px] lg:text-[18px]" />
          </Link>

          <nav aria-label={header.navLabel} className="hidden lg:block">
            <ul className="flex items-center">
              {navItems.map((it, i) => (
                <li key={it.id} className={`flex items-center${i >= HIDDEN_BELOW_XL ? " max-xl:hidden" : ""}`}>
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-[14px] font-mono font-medium text-orange-500">
                      /
                    </span>
                  )}
                  <a
                    href={`/#${it.id}`}
                    aria-current={active === it.id ? "location" : undefined}
                    className="relative inline-flex h-11 items-center text-[16px] font-medium text-navy-800 after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-orange-500 after:transition-transform after:duration-200 after:ease-out after:content-[''] hover:after:scale-x-100 aria-[current=location]:after:scale-x-100"
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ButtonLink href="/#contact" size="sm" className="hidden lg:inline-flex">
            {header.cta}
          </ButtonLink>

          <button
            ref={burgerRef}
            type="button"
            className="-mr-2 flex size-11 flex-col items-end justify-center gap-[6px] px-2.5 lg:hidden"
            aria-label={open ? header.closeMenu : header.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span className="h-0.5 w-6 bg-navy-800" />
            <span className="h-0.5 w-6 bg-navy-800" />
            <span className="h-0.5 w-3.5 bg-navy-800" />
          </button>
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-navy-800 opacity-0 transition-opacity duration-200 group-data-scrolled:opacity-100"
        />
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={header.menuDialog}
        inert={!open}
        data-open={open ? "" : undefined}
        onKeyDown={trapTab}
        className="menu-sheet paper-bg fixed inset-0 z-60 flex flex-col overflow-y-auto lg:hidden"
      >
        <div className="wrap flex h-14 shrink-0 items-center justify-between">
          <Logo markClassName="h-7" wordClassName="text-[15px]" />
          <button
            ref={closeRef}
            type="button"
            className="-mr-2 relative size-11"
            aria-label={header.closeMenu}
            onClick={() => {
              setOpen(false);
              burgerRef.current?.focus();
            }}
          >
            <span className="absolute left-2.5 top-1/2 h-0.5 w-6 rotate-45 bg-navy-800" />
            <span className="absolute left-2.5 top-1/2 h-0.5 w-6 -rotate-45 bg-navy-800" />
          </button>
        </div>

        <nav aria-label={header.navLabel} className="wrap">
          <ol>
            {navItems.map((it, i) => (
              <li
                key={it.id}
                className="menu-row border-b border-navy-800/18"
                style={cssVars({ "--i": i })}
              >
                <a
                  href={`/#${it.id}`}
                  onClick={closeToSection(it.id)}
                  className="flex h-[clamp(52px,8.5svh,72px)] items-center gap-5"
                >
                  <span aria-hidden="true" className="w-4 font-mono text-[14px] font-medium text-orange-700">
                    {i + 1}
                  </span>
                  <span className="font-display text-[36px] font-bold leading-none">{it.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="wrap menu-row mt-auto space-y-3 pb-6 pt-6" style={cssVars({ "--i": navItems.length })}>
          <ButtonLink href="/#contact" size="lg" fullWidth onClick={closeToSection("contact")}>
            {header.cta}
          </ButtonLink>
          <div className="grid grid-cols-2 gap-3">
            <ButtonLink
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              aria-label={header.telegram}
            >
              Telegram
            </ButtonLink>
            <ButtonLink
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              aria-label={header.whatsapp}
            >
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
