import { FnList, FnMark } from "@/components/ui/Footnote";
import { RegMark } from "@/components/ui/Glyphs";
import { InView } from "@/components/ui/InView";
import { Pen } from "@/components/ui/Pen";
import { SectionHead } from "@/components/ui/SectionHead";
import { fnNumber, footnotes, guarantees, redpen } from "@/content";
import { stats } from "@/config/site";
import { cssVars } from "@/lib/utils";

const FOOTNOTE: Record<number, number> = {
  0: fnNumber.plagiarism,
  3: fnNumber.revisions,
  4: fnNumber.privacy,
};


/** Сетка зачётов нарисована на ровно 29 x 15 = 435 клеток; другое число студентов: сетка скрыта, число остаётся */
const ROLL_CELLS = 29 * 15;

/** Пункт с полем `pen` в данных: к этой фразе ставится пометка научрука redpen.4 */
function ItemText({ text, phrase }: { text: string; phrase?: string }) {
  const at = phrase ? text.indexOf(phrase) : -1;
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="pen-wrap">
        {phrase}
        <Pen kind="underline" duration={450} delay={300} className="-bottom-[3px] left-0 h-2.5 w-full" />
        <span aria-hidden="true" className="clause-note">
          <span className="clause-arrow">
            <Pen kind="arrow" duration={500} delay={500} className="clause-arrow-svg" />
          </span>
          <span className="clause-note-t">{redpen[4]}</span>
        </span>
      </span>
      {text.slice(at + (phrase?.length ?? 0))}
    </>
  );
}

/** Шкала с порогом: `fill` заливка 0..fill %, `hatch` штриховка от..до, красный штрих на пороге. Декор. */
function Scale({
  fill,
  hatch,
  at,
  labels,
  circleZero = false,
}: {
  fill?: number;
  hatch: [number, number];
  at: number;
  labels: number[];
  circleZero?: boolean;
}) {
  return (
    <div className="scale" aria-hidden="true">
      <div className="scale-bar">
        {fill ? <i className="scale-fill" style={{ width: `${fill}%` }} /> : null}
        <i
          className="scale-hatch"
          style={cssVars({ left: `${hatch[0]}%`, width: `${hatch[1] - hatch[0]}%`, "--hd": fill ? "600ms" : "0ms" })}
        />
      </div>
      <div className="scale-ticks" />
      {labels.map((v) => (
        <span key={v} className="scale-lbl" style={cssVars({ "--at": `${v}%` })}>
          {v}
          {circleZero && v === 0 ? (
            <Pen
              kind="circle"
              delay={700}
              duration={450}
              className="left-1/2 top-1/2 h-[22px] w-[28px] -translate-x-1/2 -translate-y-1/2"
            />
          ) : null}
        </span>
      ))}
      <span className="scale-vbar" style={cssVars({ "--at": `${at}%` })}>
        <Pen kind="vbar" delay={fill ? 600 : 400} duration={350} className="inset-0 size-full" />
      </span>
    </div>
  );
}

/** § 4 «Гарантии»: справка о проверке, зачётная ведомость, пункты договора 4.1…4.N. */
export function Guarantees() {
  const g = guarantees;
  const orig = stats.originality;
  const ai = stats.ai;
  const students = stats.students;

  return (
    <section id="guarantees" aria-labelledby="guarantees-title" tabIndex={-1}>
      <div className="wrap">
        <div className="sect-in">
          <div className="sect-grid pg">
            <SectionHead id="guarantees-title" number={g.number} title={g.title} lead={g.lead} />

            <InView className="docs grid gap-y-8 lg:grid-cols-subgrid">
              <div className="cert lg:col-[1/span_7]" role="group" aria-labelledby="cert-title">
                <div className="doc-head">
                  <h3 id="cert-title" className="label">
                    {g.cert.title}
                  </h3>
                  <p className="doc-sub">{g.cert.sub}</p>
                </div>
                <div className="cert-head dbl-rule dbl-rule-draw" aria-hidden="true" />
                <dl className="cert-dl">
                  <div className="cert-row cert-row-scale">
                    <dt className="label">{g.orig.label}</dt>
                    <dd>
                      <div className="cert-val">
                        <span className="price">
                          <span className="price-pre price-from">{g.orig.pre} </span>
                          <span className="price-num">{orig}%</span>
                        </span>
                      </div>
                      <Scale fill={orig} hatch={[orig, 100]} at={orig} labels={[0, 50, orig, 100]} />
                    </dd>
                  </div>

                  <div className="cert-row cert-row-scale">
                    <dt className="label">{g.ai.label}</dt>
                    <dd>
                      <div className="cert-val">
                        <span className="price">
                          <span className="price-pre price-from">{g.ai.pre} </span>
                          <span className="price-num">{ai}%</span>
                        </span>
                        <span className="hand hand-write" style={cssVars({ "--rot": "-3deg" })}>
                          {g.ai.pen}
                        </span>
                      </div>
                      <Scale hatch={[0, ai]} at={ai} labels={[0, ai, 100]} circleZero />
                    </dd>
                  </div>

                  <div className="cert-row cert-item">
                    <dt className="label">
                      <span className="cert-check" aria-hidden="true">
                        <Pen kind="check" delay={500} duration={400} className="inset-0 size-full" />
                      </span>
                      {g.edits.label}
                    </dt>
                    <dd className="cert-big">{g.edits.value}</dd>
                  </div>

                  <div className="cert-row cert-item">
                    <dt className="label">
                      <span className="cert-check" aria-hidden="true">
                        <Pen kind="check" delay={650} duration={400} className="inset-0 size-full" />
                      </span>
                      {g.contact.label}
                    </dt>
                    <dd className="cert-big">{g.contact.value}</dd>
                  </div>
                </dl>
              </div>

              {students > 0 ? (
                <div className="roll lg:col-[8/span_4]" role="group" aria-labelledby="roll-title">
                  <div className="doc-head">
                    <h3 id="roll-title" className="label">
                      {g.roll.title}
                    </h3>
                  </div>
                  <div className="dbl-rule dbl-rule-draw mb-6" aria-hidden="true" />
                  <div className="roll-body">
                    <div>
                      <p className="fig">{students}</p>
                      <p className="roll-text">{g.roll.text}</p>
                    </div>
                    {students === ROLL_CELLS ? (
                      <div className="roll-gridwrap">
                        <div className="roll-grid" aria-hidden="true" />
                        {g.roll.pen ? (
                          <span className="roll-pen">
                            <span className="hand" style={cssVars({ "--rot": "0deg" })}>
                              {g.roll.pen}
                            </span>
                            <Pen
                              kind="underline"
                              delay={900}
                              duration={350}
                              className="inset-x-2 -bottom-0.5 h-2.5 w-[calc(100%-16px)]"
                            />
                          </span>
                        ) : null}
                      </div>
                    ) : g.roll.pen ? (
                      <p className="hand mt-4">{g.roll.pen}</p>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </InView>

            <p className="label clauses-label">
              <span aria-hidden="true" className="mr-2 text-orange-500">
                /
              </span>
              {g.clausesTitle}
            </p>

            <InView className="lg:col-[2/span_8]">
              <div className="contract">
                <RegMark className="reg reg-tl" />
                <RegMark className="reg reg-tr" />
                <RegMark className="reg reg-bl" />
                <RegMark className="reg reg-br" />
                <RegMark className="reg reg-field reg-ft" />
                <RegMark className="reg reg-field reg-fb" />
                <span aria-hidden="true" className="contract-field" />

                <ol role="list">
                  {g.items.map((item, i) => {
                    const fn = FOOTNOTE[i];
                    const marked = Boolean(item.pen && item.text.includes(item.pen));
                    return (
                      <li
                        key={item.title}
                        className="clause draw-rule"
                        style={cssVars({ "--i": i, "--step": "70ms" })}
                      >
                        <span aria-hidden="true" className="clause-no">
                          4.{i + 1}
                        </span>
                        <div className="clause-body">
                          <h3 className="clause-h">{item.title}</h3>
                          <p className="clause-p">
                            <ItemText text={item.text} phrase={marked ? item.pen : undefined} />
                            {fn && <FnMark n={fn} />}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </InView>

            <FnList
              className="mt-12 lg:col-[2/span_8]"
              items={[
                { n: fnNumber.plagiarism, text: footnotes.plagiarism },
                { n: fnNumber.revisions, text: footnotes.revisions },
                { n: fnNumber.privacy, text: footnotes.privacy },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
