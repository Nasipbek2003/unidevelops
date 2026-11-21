"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface InViewProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  rootMargin?: string;
  /** Тег-обёртка: span, когда блок стоит внутри фразового контента (например, button) */
  as?: "div" | "span";
}

/**
 * Один раз ставит атрибут data-inview, когда блок вошёл в вид.
 * В серверной разметке атрибута нет; React им не управляет, поэтому гидратация не расходится.
 */
export function InView({ children, className, style, rootMargin = "0px 0px -12% 0px", as: Tag = "div" }: InViewProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute("data-inview", "");
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}
