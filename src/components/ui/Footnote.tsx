/** Маркер сноски в тексте: <sup>, связь с текстом через aria-describedby. */
export function FnMark({ n }: { n: number }) {
  return (
    <sup
      className="ml-px font-sans text-[0.7em] font-semibold text-orange-700 transition-colors duration-150 group-hover:text-navy-800"
      aria-describedby={`fn-${n}`}
    >
      {n}
    </sup>
  );
}

export interface FnItem {
  n: number;
  text: string;
}

/** Блок сносок в конце секции: короткая линия, номер и текст. */
export function FnList({ items, className }: { items: FnItem[]; className?: string }) {
  return (
    <div className={className}>
      <div className="mb-3 h-px w-24 bg-navy-800" aria-hidden="true" />
      <ol className="space-y-2">
        {items.map((it) => (
          <li key={it.n} id={`fn-${it.n}`} className="flex max-w-[62ch] items-baseline gap-2">
            <span className="w-4 shrink-0 font-display text-[18px] font-semibold italic leading-none text-orange-700">
              {it.n}
            </span>
            <span className="text-small text-ink-soft">{it.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
