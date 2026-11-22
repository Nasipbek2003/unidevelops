import { FnMark } from "@/components/ui/Footnote";
import { InView } from "@/components/ui/InView";
import { Note } from "@/components/ui/Note";
import { Pen } from "@/components/ui/Pen";
import { Price } from "@/components/ui/Price";
import { fnNumber, margin, redpen, services } from "@/content";
import { cssVars } from "@/lib/utils";
import { Deck } from "./Deck";
import { PresetLink } from "./PresetLink";

/**
 * Научные работы. Один DOM на все ширины:
 * <1024 колода листов со свайпом, >=1024 страница-оглавление (различия только CSS).
 */
export function ScienceDeck({ headingId }: { headingId: string }) {
  const { science } = services;
  const n = science.items.length;

  return (
    <div className="sci relative lg:col-[2/span_7]">
      <Note rot={-3} arrow="down-right" className="mb-4 lg:absolute lg:bottom-full lg:left-0 lg:mb-3">
        {margin.science}
      </Note>
      <h3 id={headingId} className="sci-h3">
        {science.name}
      </h3>
      <p className="sci-text">{science.text}</p>

      <InView className="deck-wrap" style={cssVars({ "--n": n })}>
        {services.hint ? (
          <p className="hint" aria-hidden="true">
            <span className="note" style={cssVars({ "--rot": "-3deg" })}>
              {services.hint}
            </span>
            <svg viewBox="0 0 56 20" width="56" height="20" fill="none" focusable="false">
              <path d="M2 11 C16 6 32 6 50 10 M42 3 L51 10 L42 17" pathLength={1} />
            </svg>
          </p>
        ) : null}

        <Deck headingId={headingId}>
          {science.items.map((it, i) => (
            <li key={it.title} className="leaf draw-rule" style={cssVars({ "--i": i })}>
              <PresetLink type={it.type} className="leaf-a mark-host">
                <span aria-hidden="true" className="leaf-no">
                  {i + 1}
                </span>
                <h4 className="leaf-t">
                  <span className="mark-bg">{it.title}</span>
                </h4>
                <span aria-hidden="true" className="leaf-dots" />
                <p className="leaf-p">{it.text}</p>
                <span className="leaf-price">
                  <Price value={it.price} size="sm" />
                </span>
                <span className="leaf-term">
                  <span className="leaf-when">
                    {it.term}
                    {i === 0 && <FnMark n={fnNumber.services} />}
                    <svg aria-hidden="true" focusable="false" className="leaf-pen" viewBox="0 0 200 14" preserveAspectRatio="none">
                      <path d="M2 9 C30 3 60 12 100 7 S170 4 198 8" pathLength={1} />
                    </svg>
                  </span>
                  <i aria-hidden="true" className="leaf-go">
                    -&gt;
                  </i>
                </span>
              </PresetLink>

              {i === 0 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[calc(100%+68px)] top-6 hidden -rotate-[4deg] items-center gap-2 xl:inline-flex"
                >
                  <span className="relative inline-block h-8 w-14 shrink-0 rotate-[190deg]">
                    <Pen kind="arrow" delay={300} duration={500} className="inset-0 size-full" />
                  </span>
                  <span className="select-none font-hand text-[24px] leading-none text-orange-700">{redpen[3]}</span>
                </span>
              )}
            </li>
          ))}
        </Deck>

        <div className="deck-track" aria-hidden="true">
          <i className="deck-thumb" />
        </div>
      </InView>
    </div>
  );
}
