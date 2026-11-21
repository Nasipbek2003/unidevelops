"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

/**
 * Привязывает сцену hero к прокрутке: пишет прогресс 0…1 в CSS-переменную --p
 * и ставит атрибут data-stamped при p >= 0.92 на .hero-artifact (вся геометрия сцены
 * внутри него, поэтому стили текстовой колонки на кадрах прокрутки не пересчитываются).
 * Перерисовок React нет, разметка
 * на сервере и клиенте одинакова. Статичные режимы (reduced-motion, низкий экран)
 * задаются чистым CSS и перекрывают --p.
 */
export function HeroScene({ children }: { children: ReactNode }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const artifactRef = useRef<HTMLElement | null>(null);
  const runwayRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start end", "end end"],
  });

  const apply = useCallback((value: number) => {
    const el =
      artifactRef.current ??
      (artifactRef.current = sceneRef.current?.querySelector<HTMLElement>(".hero-artifact") ?? null);
    if (!el || Number.isNaN(value)) return;
    const p = Math.min(1, Math.max(0, value));
    el.style.setProperty("--p", p.toFixed(4));
    const stamped = p >= 0.92;
    if (el.hasAttribute("data-stamped") !== stamped) el.toggleAttribute("data-stamped", stamped);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", apply);

  useEffect(() => {
    apply(scrollYProgress.get());
  }, [apply, scrollYProgress]);

  return (
    <div ref={sceneRef} className="hero-scene">
      {children}
      <div ref={runwayRef} className="hero-runway" aria-hidden="true" />
    </div>
  );
}
