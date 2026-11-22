"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Допуск попадания заголовка под шапку, px (design.md разд. 6: не больше 8). */
const TOLERANCE = 4;
/** Минимум кадров ожидания: плавный скролл может стартовать не сразу (например, после закрытия меню). */
const MIN_FRAMES = 30;
/** Кадров без движения, после которых скролл считается законченным. */
const STILL_FRAMES = 15;
/** Страховка: дольше 5 секунд не ждём. */
const MAX_FRAMES = 300;

let cancelPrev: (() => void) | null = null;

/**
 * `content-visibility: auto` у секций после hero даёт им оценочную высоту, пока их не отрисовали.
 * Плавный скролл к якорю считает цель по оценке, поэтому может не долететь или перелететь.
 * После остановки проверяем, где оказался заголовок секции, и при промахе дотягиваем мгновенно.
 */
function settle(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  cancelPrev?.();

  let frames = 0;
  let still = 0;
  let last = window.scrollY;
  let raf = 0;
  let stopped = false;

  const stop = () => {
    stopped = true;
    cancelAnimationFrame(raf);
    for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
      window.removeEventListener(type, stop);
    }
    if (cancelPrev === stop) cancelPrev = null;
  };
  cancelPrev = stop;
  for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
    window.addEventListener(type, stop, { passive: true, once: true });
  }

  const tick = () => {
    if (stopped) return;
    frames += 1;
    const y = window.scrollY;
    still = Math.abs(y - last) < 0.5 ? still + 1 : 0;
    last = y;
    if ((frames >= MIN_FRAMES && still >= STILL_FRAMES) || frames >= MAX_FRAMES) {
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      if (Math.abs(el.getBoundingClientRect().top - margin) > TOLERANCE) {
        el.scrollIntoView({ behavior: "instant" });
      }
      stop();
      return;
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
}

export function AnchorSettle() {
  const pathname = usePathname();

  // Переход по ссылке-якорю на этой же странице (шапка, меню, подвал)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      settle(decodeURIComponent(url.hash.slice(1)));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Приход на страницу с якорем (в том числе со страницы 404)
  useEffect(() => {
    if (window.location.hash) settle(decodeURIComponent(window.location.hash.slice(1)));
  }, [pathname]);

  return null;
}
