import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowGlyph } from "./Glyphs";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface Common {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

function classes(variant: Variant, size: Size, fullWidth?: boolean, className?: string) {
  return cn("btn", `btn-${variant}`, `btn-${size}`, fullWidth && "w-full", className);
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  fullWidth,
  arrow,
  className,
  children,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  // Кнопки-ссылки на форму заявки считаются целью click_cta (src/lib/analytics.ts)
  const isCta = typeof rest.href === "string" && rest.href.endsWith("#contact");
  return (
    <a {...rest} data-cta={isCta ? "" : undefined} className={classes(variant, size, fullWidth, className)}>
      {children}
      {arrow && <ArrowGlyph />}
    </a>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  arrow,
  className,
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={classes(variant, size, fullWidth, className)}>
      {children}
      {arrow && <ArrowGlyph />}
    </button>
  );
}
