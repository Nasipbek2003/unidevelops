"use client";

import { useState } from "react";
import { InView } from "@/components/ui/InView";
import { Pen } from "@/components/ui/Pen";
import { SectionHead } from "@/components/ui/SectionHead";
import { faq, redpen } from "@/content";

/** Вопрос «Как проходит оплата?»: к нему относится пометка «см. гл. 2» (§ 2 «Как идёт работа»: этапы и предоплата) */
const PAY_INDEX = 2;

export function Faq() {
  // Первый вопрос открыт по умолчанию (одинаково на сервере и клиенте)
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" tabIndex={-1}>
      <div className="wrap">
        <div className="sect-in">
          <div className="sect-grid pg">
            <SectionHead
              id="faq-title"
              number={faq.number}
              title={faq.title}
              numberInTitle={false}
              className="mb-12 md:mb-16 lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:col-[2/span_4] lg:mb-0 lg:self-start"
            />

            <ol className="lg:col-[6/span_7]">
              {faq.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q} className="border-t border-navy-800 last:border-b">
                    <h3>
                      <button
                        type="button"
                        id={`faq-q-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-p-${i}`}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="mark-host group flex min-h-16 w-full items-center gap-3 py-5 text-left md:min-h-[72px] md:py-6"
                      >
                        <span
                          aria-hidden="true"
                          className={`w-9 shrink-0 font-display text-[24px] font-medium italic leading-none transition-colors duration-200 md:w-10 md:text-[28px] lg:w-12 ${
                            isOpen ? "text-navy-800" : "text-orange-700"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="min-w-0 flex-1 font-display text-[24px] font-semibold leading-[1.1] [overflow-wrap:anywhere] md:text-[26px] lg:text-[30px]">
                          <span className="mark-bg">{item.q}</span>
                          {i === PAY_INDEX && (
                            <InView
                              as="span"
                              className="ml-6 hidden -rotate-[4deg] items-end gap-2 align-middle lg:inline-flex"
                            >
                              <span className="relative inline-block h-8 w-16 shrink-0 rotate-[190deg]" aria-hidden="true">
                                <Pen kind="arrow" duration={500} delay={200} className="inset-0 size-full" />
                              </span>
                              <span aria-hidden="true" className="font-hand text-[24px] font-normal leading-none text-orange-700">
                                {redpen[5]}
                              </span>
                            </InView>
                          )}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`grid size-8 shrink-0 place-items-center border border-navy-800 font-mono text-[22px] font-medium leading-none transition-colors duration-200 ${
                            isOpen ? "bg-navy-800 text-paper" : "text-navy-800"
                          }`}
                        >
                          {isOpen ? "–" : "+"}
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-p-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      inert={!isOpen}
                      data-open={isOpen ? "" : undefined}
                      className="faq-panel"
                    >
                      <div className="overflow-hidden">
                        <div className="ml-9 pb-7 md:ml-10 lg:ml-12">
                          <p className="border-l-2 border-orange-500 pl-5 text-body">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
