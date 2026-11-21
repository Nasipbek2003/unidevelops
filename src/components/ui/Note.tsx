import { cn, cssVars } from "@/lib/utils";
import { InView } from "./InView";
import { Pen } from "./Pen";

type Dir = "down-right" | "right" | "up-left" | "down";

const ARROW_ROT: Record<Dir, string> = {
  "down-right": "rotate-0",
  right: "-rotate-[38deg]",
  "up-left": "rotate-[200deg]",
  down: "rotate-[40deg]",
};

/** Статичные строки для Tailwind: поворот стрелки на lg */
const ARROW_ROT_LG: Record<Dir, string> = {
  "down-right": "lg:rotate-0",
  right: "lg:-rotate-[38deg]",
  "up-left": "lg:rotate-[200deg]",
  down: "lg:rotate-[40deg]",
};

interface NoteProps {
  children: string;
  /** Поворот заметки в градусах (-4…+3) */
  rot?: number;
  arrow?: Dir;
  /** Другое направление стрелки на >=1024 */
  arrowLg?: Dir;
  className?: string;
  delay?: number;
  /** Стрелка рисуется при загрузке (hero); иначе при входе в вид */
  load?: boolean;
}

/** Заметка на полях (Marck Script) со стрелкой. Декор, aria-hidden. */
export function Note({ children, rot = -3, arrow = "down-right", arrowLg, className, delay = 200, load = false }: NoteProps) {
  const body = (
    <>
      <span className="note">{children}</span>
      <Pen
        kind="arrow"
        delay={delay}
        duration={500}
        onLoad={load}
        className={cn("relative! mt-2 h-9 w-14 shrink-0 md:h-10 md:w-16", ARROW_ROT[arrow], arrowLg && ARROW_ROT_LG[arrowLg])}
      />
    </>
  );
  const cls = cn("inline-flex items-start gap-1", className);
  const style = cssVars({ "--rot": `${rot}deg` });

  return load ? (
    <span className={cls} style={style} aria-hidden="true">
      {body}
    </span>
  ) : (
    <span aria-hidden="true" className="contents" style={style}>
      <InView className={cls}>{body}</InView>
    </span>
  );
}
