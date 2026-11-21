"use client";

import { useEffect, useRef } from "react";

/**
 * Текущий год. В статической разметке стоит год сборки; после монтирования
 * значение при необходимости обновляется напрямую в DOM, а предупреждение гидратации подавлено.
 */
export function CurrentYear() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const year = String(new Date().getFullYear());
    if (ref.current && ref.current.textContent !== year) ref.current.textContent = year;
  }, []);

  return (
    <span ref={ref} suppressHydrationWarning>
      {new Date().getFullYear()}
    </span>
  );
}
