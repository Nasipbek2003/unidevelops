import { cn } from "@/lib/utils";

export const LOGO_COLORS = {
  navy: "#1B3650",
  orange: "#F0764F",
  paper: "#F4EEE2",
} as const;

export const LOGO_PATHS = {
  u: { d: "M8 6 V64 A22 22 0 0 0 52 64 V52", width: 11 },
  topArc: { d: "M56 6 H80 A40 40 0 0 1 112.8 23.1", width: 10 },
  outerArc: { d: "M117.6 32.3 A40 40 0 0 1 80 86 H58", width: 10 },
  innerArc: { d: "M66 22 H80 A24 24 0 0 1 80 70 H66", width: 8 },
  arrowHead: "50,26 74,34 63,42 58,52",
  arrowTail: { d: "M63 42 L53 53", width: 7 },
} as const;

interface LogoMarkProps {
  /** dark = знак на тёмном фоне (U и верхняя дуга paper) */
  theme?: "light" | "dark";
  className?: string;
}

/** Знак UD. Статичный вариант (server-safe). */
export function LogoMark({ theme = "dark", className }: LogoMarkProps) {
  const base = theme === "dark" ? LOGO_COLORS.paper : LOGO_COLORS.navy;
  const common = {
    fill: "none",
    strokeLinecap: "butt",
    strokeLinejoin: "miter",
  } as const;

  return (
    <svg
      viewBox="0 0 124 92"
      className={cn("block h-full w-auto", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path {...common} d={LOGO_PATHS.u.d} stroke={base} strokeWidth={LOGO_PATHS.u.width} />
      <path
        {...common}
        d={LOGO_PATHS.topArc.d}
        stroke={base}
        strokeWidth={LOGO_PATHS.topArc.width}
      />
      <path
        {...common}
        d={LOGO_PATHS.outerArc.d}
        stroke={LOGO_COLORS.orange}
        strokeWidth={LOGO_PATHS.outerArc.width}
      />
      <path
        {...common}
        d={LOGO_PATHS.innerArc.d}
        stroke={LOGO_COLORS.orange}
        strokeWidth={LOGO_PATHS.innerArc.width}
      />
      <g>
        <polygon points={LOGO_PATHS.arrowHead} fill={LOGO_COLORS.orange} />
        <path
          {...common}
          d={LOGO_PATHS.arrowTail.d}
          stroke={LOGO_COLORS.orange}
          strokeWidth={LOGO_PATHS.arrowTail.width}
        />
      </g>
    </svg>
  );
}
