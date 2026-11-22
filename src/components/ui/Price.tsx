import type { ReactNode } from "react";
import { cn, cssVars } from "@/lib/utils";

const RE = /^(от|меньше)\s+(\d[\d \s]*)\s+(сом)$/u;

/** Число из цены «от 1 200 сом» или null, если цифры нет («после оценки»). */
export function priceNumber(value: string): number | null {
  const m = RE.exec(value);
  return m ? Number(m[2].replace(/\D/g, "")) : null;
}

interface PriceProps {
  /** Строка цены из данных: «от 300 сом» или «после оценки» */
  value: string;
  /** lg: цена сметы (price), sm: цена в листе и оглавлении (price-sm) */
  size?: "lg" | "sm";
  /** Поворот рукописного значения, градусы */
  rot?: number;
  /** Вложение в слово «от» (красный круг пером), только size lg */
  fromMark?: ReactNode;
  className?: string;
}

/**
 * Цена как текст в DOM. «от N сом»: число антиквой, «от» и «сом» мелким моно (lg);
 * без цифры («после оценки») набирается рукописью. Пробелы в разряде и перед «сом» неразрывные.
 */
export function Price({ value, size = "lg", rot, fromMark, className }: PriceProps) {
  const m = RE.exec(value);
  if (!m) {
    return (
      <span
        className={cn("hand", size === "sm" && "hand-sm", className)}
        style={rot === undefined ? undefined : cssVars({ "--rot": `${rot}deg` })}
      >
        {value}
      </span>
    );
  }
  if (size === "sm") {
    return <span className={cn("price-sm", className)}>{value}</span>;
  }
  return (
    <span className={cn("price", className)}>
      <span className="price-pre price-from">
        {m[1]}
        {fromMark}
        {" "}
      </span>
      <span className="price-num">{m[2]}</span>
      <span className="price-pre price-cur">{" " + m[3]}</span>
    </span>
  );
}
