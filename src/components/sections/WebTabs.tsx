"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { LogoMark } from "@/components/brand/LogoMark";
import { ArrowGlyph } from "@/components/ui/Glyphs";
import { InView } from "@/components/ui/InView";
import { Note } from "@/components/ui/Note";
import { margin, services } from "@/content";
import { cssVars } from "@/lib/utils";
import { PresetLink } from "./PresetLink";
import { wireframes } from "./wireframes";

/**
 * Разработка сайтов: окно во вкладках (WAI-ARIA Tabs, автоактивация).
 * Начальная вкладка 0 на сервере и клиенте; различия по ширине только в CSS.
 */
export function WebTabs() {
  const { web } = services;
  const uid = useId();
  const headingId = `${uid}-h`;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const count = web.items.length;

  const select = (i: number, focus = false) => {
    setActive(i);
    const tab = tabRefs.current[i];
    const list = listRef.current;
    if (focus) tab?.focus({ preventScroll: true });
    // Подтягиваем вкладку в видимую зону самого tablist (страница не двигается)
    if (tab && list && list.scrollWidth > list.clientWidth) {
      const left = tab.offsetLeft;
      const right = left + tab.offsetWidth;
      if (left < list.scrollLeft || right > list.scrollLeft + list.clientWidth) {
        list.scrollTo({ left: Math.max(0, left - 16), behavior: "smooth" });
      }
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % count;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    if (next < 0) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <div className="web mt-[72px] md:mt-24 lg:col-[2/-1] lg:grid lg:grid-cols-subgrid">
      <Note
        rot={2}
        arrow="down"
        arrowLg="down-right"
        className="mb-4 lg:col-[1/span_3] lg:mb-0 lg:justify-self-end"
      >
        {margin.web}
      </Note>
      <div className="lg:col-[4/span_8]">
        <h3 id={headingId} className="sci-h3">
          {web.name}
        </h3>
        <p className="sci-text mb-6">{web.text}</p>

        <InView>
          <div className="devwin editor on-dark" data-active={active}>
            <div className="devwin-bar" aria-hidden="true">
              <span className="editor-dots">
                <i className="bg-orange-500" />
                <i className="bg-orange-300" />
                <i className="bg-mist" />
              </span>
            </div>

            <div
              ref={listRef}
              role="tablist"
              aria-labelledby={headingId}
              className="devwin-tabs"
              onKeyDown={onKeyDown}
            >
              {web.items.map((it, i) => (
                <button
                  key={it.title}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-t${i}`}
                  aria-selected={active === i}
                  aria-controls={`${uid}-p${i}`}
                  tabIndex={active === i ? 0 : -1}
                  data-on={active === i ? "" : undefined}
                  className="devwin-tab"
                  onClick={() => select(i)}
                >
                  <span aria-hidden="true" className="tab-no">
                    {i + 1}
                  </span>
                  {it.title}
                </button>
              ))}
            </div>

            <div className="stage" aria-hidden="true">
              <div className="browser-mini">
                <div className="bm-chrome">
                  <span className="bm-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="bm-url">
                    <span className="block h-3 shrink-0">
                      <LogoMark theme="light" />
                    </span>
                    UNIDEVELOPS
                  </span>
                </div>
                <div className="bm-body">
                  {wireframes.map((bricks, w) => (
                    <div key={w} className={`wf wf-${w}`}>
                      {bricks.map(([kind, x, y, bw, bh], k) => (
                        <i
                          key={k}
                          className={`b-${kind}`}
                          style={cssVars({ "--x": x, "--y": y, "--w": bw, "--h": bh, "--k": k })}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {web.items.map((it, i) => (
              <div
                key={it.title}
                role="tabpanel"
                id={`${uid}-p${i}`}
                aria-labelledby={`${uid}-t${i}`}
                hidden={active !== i}
                className="devwin-panel"
              >
                <PresetLink type={it.type} className="panel-a">
                  <h4>{it.title}</h4>
                  <p>{it.text}</p>
                  <span className="panel-term">
                    {it.price ? <span className="panel-price">{it.price}</span> : null}
                    <span className="term-type" style={cssVars({ "--n": it.term.length + 2 })}>
                      {it.term}
                    </span>
                    <ArrowGlyph className="text-orange-500" />
                  </span>
                </PresetLink>
              </div>
            ))}

            <div className="term-line" aria-hidden="true">
              <span className="text-orange-500">$ </span>
              <i className="caret caret-code" />
            </div>
          </div>
        </InView>
      </div>
    </div>
  );
}
