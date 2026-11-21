"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { FnMark } from "@/components/ui/Footnote";
import { Pen } from "@/components/ui/Pen";
import { fnNumber, process } from "@/content";

const STEP_FOOTNOTE: Record<number, number> = { 4: fnNumber.process };

/**
 * Шаги в тетради: красная линия поля рисуется по прокрутке, номер текущего шага
 * становится orange-700, галочка рисуется один раз и остаётся у пройденных.
 */
export function ProcessList() {
  const listRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<Array<HTMLLIElement | null>>([]);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  useEffect(() => {
    const rows = rowsRef.current.filter((r): r is HTMLLIElement => r !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = rows.indexOf(entry.target as HTMLLIElement);
          rows.forEach((row, i) => {
            if (i <= idx) row.setAttribute("data-done", "");
            if (i === idx) row.setAttribute("data-current", "");
            else row.removeAttribute("data-current");
          });
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={listRef} className="relative">
      <motion.div
        aria-hidden="true"
        className="margin-line absolute inset-y-0 left-2 w-[7px] md:left-3 lg:-left-5"
        style={{ scaleY }}
      />
      <ol>
        {process.steps.map((step, i) => (
          <li
            key={step.title}
            ref={(el) => {
              rowsRef.current[i] = el;
            }}
            className="group border-t border-navy-800 py-8 pl-9 last:border-b md:pl-10 lg:py-10 lg:pl-0"
          >
            <div className="grid grid-cols-[52px_1fr] items-start md:grid-cols-[120px_1fr] lg:grid-cols-11 lg:gap-x-(--gap)">
              <span
                aria-hidden="true"
                className="-mt-[0.2em] font-display text-numeral font-medium italic text-navy-800 transition-colors duration-200 group-data-current:text-orange-700 lg:col-span-2"
              >
                {i + 1}
              </span>
              <div className="lg:contents">
                <h3 className="font-display text-[26px] font-semibold leading-[1.1] md:text-[clamp(1.75rem,1.2rem+1.6vw,2.25rem)] lg:col-span-4">
                  {step.title}
                  {STEP_FOOTNOTE[i] && <FnMark n={STEP_FOOTNOTE[i]} />}
                  <span className="relative ml-3 inline-block size-7 align-middle md:size-8 lg:hidden">
                    <Pen kind="check" duration={450} className="inset-0 size-full" />
                  </span>
                </h3>
                <p className="mt-3 text-body lg:col-span-4 lg:mt-0">{step.text}</p>
              </div>
              <span className="relative hidden size-10 justify-self-end lg:col-span-1 lg:block">
                <Pen kind="check" duration={450} className="inset-0 size-full" />
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
