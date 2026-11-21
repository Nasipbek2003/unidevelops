"use client";

import type { FocusEvent, ReactNode } from "react";

/**
 * Прокручиваемая колода листов. Лист, получивший фокус с клавиатуры, подтягивается к левому краю
 * колоды по горизонтали (Chrome не двигает snap-контейнер к частично видимому элементу).
 * Прокрутка без behavior: работает CSS scroll-behavior (smooth, а при reduced-motion auto).
 */
export function Deck({ headingId, children }: { headingId: string; children: ReactNode }) {
  const onFocus = (e: FocusEvent<HTMLOListElement>) => {
    const deck = e.currentTarget;
    if (deck.scrollWidth <= deck.clientWidth) return; // >=1024 колоды нет
    const leaf = (e.target as HTMLElement).closest<HTMLElement>(".leaf");
    if (!leaf) return;
    const d = deck.getBoundingClientRect();
    const l = leaf.getBoundingClientRect();
    if (l.left >= d.left && l.right <= d.right) return; // лист уже виден целиком
    const pad = parseFloat(getComputedStyle(deck).scrollPaddingLeft) || 0;
    deck.scrollTo({ left: deck.scrollLeft + (l.left - d.left) - pad });
  };

  return (
    <ol className="deck" role="list" aria-labelledby={headingId} onFocus={onFocus}>
      {children}
    </ol>
  );
}
