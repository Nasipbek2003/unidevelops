import { cssVars } from "@/lib/utils";

type PenKind = "underline" | "circle" | "check" | "arrow" | "strike" | "vbar" | "plus";

const SHAPES: Record<PenKind, { viewBox: string; paths: string[] }> = {
  underline: {
    viewBox: "0 0 200 14",
    paths: ["M2 9 C30 3 60 12 100 7 S170 4 198 8", "M10 12 C60 8 120 13 190 10"],
  },
  circle: {
    viewBox: "0 0 200 80",
    paths: ["M104 6 C40 2 4 24 8 44 C12 66 80 76 140 70 C190 64 198 30 160 14 C140 6 110 4 88 8"],
  },
  check: { viewBox: "0 0 40 40", paths: ["M4 22 L15 34 L36 5"] },
  arrow: {
    viewBox: "0 0 80 50",
    paths: ["M4 8 C30 4 60 14 70 40", "M60 34 L70 42 L74 30"],
  },
  strike: { viewBox: "0 0 200 10", paths: ["M2 7 L198 3"] },
  vbar: { viewBox: "0 0 8 40", paths: ["M4 2 C5 14 3 28 4 38"] },
  plus: { viewBox: "0 0 24 24", paths: ["M12 3 C12 8 11 16 12 21", "M3 12 C9 11 15 13 21 12"] },
};

interface PenProps {
  kind: PenKind;
  className?: string;
  /** Задержка и длительность прорисовки, мс. */
  delay?: number;
  duration?: number;
  /** Рисовать при загрузке страницы (hero); иначе при data-inview предка. */
  onLoad?: boolean;
}

/** Штрих «красной ручки». Декор, всегда aria-hidden. */
export function Pen({ kind, className, delay = 0, duration = 600, onLoad = false }: PenProps) {
  const shape = SHAPES[kind];
  return (
    <svg
      className={`pen ${onLoad ? "pen-load" : ""} ${className ?? ""}`}
      viewBox={shape.viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={cssVars({ "--pen-delay": `${delay}ms`, "--pen-dur": `${duration}ms` })}
    >
      {shape.paths.map((d) => (
        <path key={d} d={d} pathLength={1} />
      ))}
    </svg>
  );
}
