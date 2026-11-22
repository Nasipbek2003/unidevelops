import type { ReactNode } from "react";

interface SectionHeadProps {
  id: string;
  /** Порядковая отметка, например «§ 1.» */
  number: string;
  title: string;
  /** Номер входит в текст заголовка (copy.md) или это только декоративная отметка */
  numberInTitle?: boolean;
  lead?: string;
  aside?: ReactNode;
  /** Классы заголовочного блока вместо отступов по умолчанию (например, sticky-колонка) */
  className?: string;
  /** Содержимое рельсы вместо номера без точки (например, «Прил. А») */
  rail?: ReactNode;
}

/**
 * Рельса с номером § N (>=1024, sticky) и заголовочный блок секции.
 * Размещается внутри `.sect-grid`.
 */
export function SectionHead({ id, number, title, numberInTitle = true, lead, aside, className, rail }: SectionHeadProps) {
  return (
    <>
      <div className="rail" aria-hidden="true">
        <span className="rail-num">{rail ?? number.replace(".", "")}</span>
      </div>
      <header className={`relative ${className ?? "mb-12 md:mb-16 lg:mb-24"}`}>
        <h2 id={id} className="h2 max-w-[14ch] lg:max-w-[18ch]">
          <span className="sect-num" aria-hidden={numberInTitle ? undefined : true}>
            {number}
          </span>
          {numberInTitle ? " " : null}
          {title}
        </h2>
        {lead ? <p className="lead mt-6">{lead}</p> : null}
        {aside}
      </header>
    </>
  );
}
