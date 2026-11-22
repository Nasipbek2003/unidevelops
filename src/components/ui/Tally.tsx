import { cssVars } from "@/lib/utils";

const TILT = [1, -1, 2, -2, 1, -1, 2, -2];

/**
 * Палочки учёта, нарисованные пером: число штрихов берётся из данных.
 * Декор, aria-hidden (число людей стоит рядом текстом). Рисуются при data-inview предка.
 */
export function Tally({ count, delay = 0, className }: { count: number; delay?: number; className?: string }) {
  const n = Math.max(0, Math.floor(count));
  if (n === 0) return null;
  return (
    <svg
      className={`tally ${className ?? ""}`}
      viewBox={`0 0 ${n * 28} 60`}
      aria-hidden="true"
      focusable="false"
    >
      {Array.from({ length: n }, (_, i) => {
        const x = 14 + i * 28;
        const t = TILT[i % TILT.length];
        return (
          <path
            key={i}
            d={`M${x} 3 C${x + 1 + t} 20 ${x - 1 + t} 40 ${x + t * 0.5} 57`}
            pathLength={1}
            style={cssVars({ "--pen-delay": `${delay + i * 120}ms`, "--pen-dur": "350ms" })}
          />
        );
      })}
    </svg>
  );
}
