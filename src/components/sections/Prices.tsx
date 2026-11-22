import { ButtonLink } from "@/components/ui/Button";
import { InView } from "@/components/ui/InView";
import { Note } from "@/components/ui/Note";
import { Pen } from "@/components/ui/Pen";
import { Price, priceNumber } from "@/components/ui/Price";
import { SectionHead } from "@/components/ui/SectionHead";
import { margin, prices, services } from "@/content";
import { cssVars } from "@/lib/utils";

/** Поворот рукописного «после оценки» по очереди (design.md 4.12) */
const ROTS = [-2, 1, -1.5, 1.5];

/**
 * § 2 «Цены»: смета. Данные берутся из services (те же названия и цены, что в § 1):
 * строки с цифрой идут в группу «Цены от» по возрастанию, остальные в группу «после оценки».
 */
export function Prices() {
  const sci = services.science.items;
  const base = sci
    .filter((it) => priceNumber(it.price) !== null)
    .sort((a, b) => (priceNumber(a.price) ?? 0) - (priceNumber(b.price) ?? 0));
  const quote = sci.filter((it) => priceNumber(it.price) === null);
  // Проекты с разработкой: одна строка на все вкладки § 1 (цена у всех одна, берём из данных)
  const devPrice = services.web.items[0]?.price;
  const quoteRows = [
    ...quote.map((it) => ({ title: it.title, price: it.price })),
    ...(devPrice && priceNumber(devPrice) === null ? [{ title: prices.devRow, price: devPrice }] : []),
  ];
  const f = prices.factors;

  return (
    <section id="prices" aria-labelledby="prices-title" tabIndex={-1}>
      <div className="wrap">
        <div className="sect-in">
          <div className="sect-grid pg">
            <SectionHead id="prices-title" number={prices.number} title={prices.title} lead={prices.lead} />

            <InView className="est grid gap-y-0 lg:grid-cols-subgrid">
              <div className="lg:col-[1/span_7] lg:row-start-1">
                <h3 className="label est-label">
                  <span aria-hidden="true">/</span>
                  {prices.baseTitle}
                </h3>
                <dl>
                  {base.map((it, i) => (
                    <div key={it.title} className="est-row draw-rule" style={cssVars({ "--i": i })}>
                      <dt>{it.title}</dt>
                      <dd>
                        <Price
                          value={it.price}
                          fromMark={
                            i === 0 ? (
                              <Pen
                                kind="circle"
                                delay={400}
                                duration={450}
                                className="-left-[10px] -top-[6px] h-[30px] w-[40px]"
                              />
                            ) : null
                          }
                        />
                        {i === 0 && margin.prices ? (
                          <div className="est-margin">
                            <Note rot={-3} arrow="left" className="flex-row-reverse">
                              {margin.prices}
                            </Note>
                          </div>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="est-gap lg:col-[1/span_7] lg:row-start-2">
                <div className="dbl-rule" aria-hidden="true" />
                <h3 className="label est-label">
                  <span aria-hidden="true">/</span>
                  {prices.quoteTitle}
                </h3>
                <dl>
                  {quoteRows.map((row, i) => (
                    <div key={row.title} className="est-row est-row-blank draw-rule" style={cssVars({ "--i": i })}>
                      <dt>{row.title}</dt>
                      <dd>
                        <span className="est-blank">
                          <Price
                            value={row.price}
                            rot={ROTS[i % ROTS.length]}
                            className="hand-write"
                          />
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="sticker-f lg:col-[8/span_4] lg:row-start-2" role="group" aria-labelledby="prices-factors">
                <span className="sticker-f-tape" aria-hidden="true" />
                <span className="sf-arrow" aria-hidden="true">
                  <Pen kind="arrow" delay={900} duration={500} className="inset-0 size-full" />
                </span>
                <div className="sticker-f-in">
                  <h3 id="prices-factors">{f.title}</h3>
                  <ul role="list" className="sf-list">
                    {f.items.map((it, i) => (
                      <li key={it.title}>
                        {i > 0 ? (
                          <span className="sf-plus" aria-hidden="true">
                            <Pen kind="plus" delay={500 + i * 150} duration={350} className="inset-0 size-full" />
                          </span>
                        ) : (
                          <span aria-hidden="true" />
                        )}
                        <div>
                          <p className="sf-title">{it.title}</p>
                          <p className="sf-text">{it.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="sf-promise">
                    {prices.promise}
                    <Pen
                      kind="underline"
                      delay={900}
                      duration={450}
                      className="bottom-0 left-0 h-2.5 w-[70%]"
                    />
                  </p>
                </div>
              </div>

              <div className="mt-12 lg:col-[1/span_7] lg:row-start-3">
                <ButtonLink href="#contact" size="lg" arrow className="w-full sm:w-auto">
                  {prices.cta}
                </ButtonLink>
              </div>
            </InView>
          </div>
        </div>
      </div>
    </section>
  );
}
