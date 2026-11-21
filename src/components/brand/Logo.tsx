import { cn } from "@/lib/utils";
import { LogoMark } from "./LogoMark";

interface LogoProps {
  theme?: "light" | "dark";
  /** Классы высоты знака */
  markClassName?: string;
  className?: string;
  wordClassName?: string;
}

/** Знак UD + wordmark UNIDEVELOPS (Golos Text 700, капс). Подписи под логотипом нет. */
export function Logo({ theme = "light", markClassName = "h-9", className, wordClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className={cn("block shrink-0", markClassName)} aria-hidden="true">
        <LogoMark theme={theme === "dark" ? "dark" : "light"} />
      </span>
      <span
        className={cn(
          "font-sans font-bold uppercase leading-none tracking-[0.02em]",
          theme === "dark" ? "text-paper" : "text-navy-800",
          wordClassName ?? "text-[18px]",
        )}
      >
        UNIDEVELOPS
      </span>
    </span>
  );
}
