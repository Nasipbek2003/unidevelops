import { FnList, FnMark } from "@/components/ui/Footnote";
import { RegMark } from "@/components/ui/Glyphs";
import { InView } from "@/components/ui/InView";
import { Pen } from "@/components/ui/Pen";
import { SectionHead } from "@/components/ui/SectionHead";
import { advantages, fnNumber, footnotes, redpen } from "@/content";
import { cssVars } from "@/lib/utils";

const FOOTNOTE: Record<number, number> = {
  0: fnNumber.plagiarism,
  3: fnNumber.revisions,
  4: fnNumber.privacy,
};

/** Пункт 3.3 «Дата заранее»: к фразе пометка научрука redpen.4 (фраза берётся из текста пункта) */
const MARKED_INDEX = 2;
const MARKED_PHRASE = "на каком мы этапе";

function ItemText({ text, marked }: { text: string; marked: boolean }) {
  const at = marked ? text.indexOf(MARKED_PHRASE) : -1;
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="pen-wrap whitespace-nowrap">
        {MARKED_PHRASE}
        <Pen kind="underline" duration={450} delay={300} className="-bottom-[3px] left-0 h-2.5 w-full" />
        <span aria-hidden="true" className="clause-note">
          <span className="clause-arrow">
            <Pen kind="arrow" duration={500} delay={500} className="inset-0 size-full" />
          </span>
          <span className="note" style={cssVars({ "--rot": "-4deg" })}>
            {redpen[4]}
          </span>
        </span>
      </span>
      {text.slice(at + MARKED_PHRASE.length)}
    </>
  );
}

/** § 3 «Условия», набранные как пункты договора 3.1…3.6. */
export function Advantages() {
  return (
    <section id="advantages" aria-labelledby="advantages-title" tabIndex={-1}>
      <div className="wrap">
        <div className="sect-in">
          <div className="sect-grid pg">
            <SectionHead
              id="advantages-title"
              number={advantages.number}
              title={advantages.title}
              lead={advantages.lead}
            />

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
                  {advantages.items.map((item, i) => {
                    const fn = FOOTNOTE[i];
                    const tag = "tag" in item ? item.tag : null;
                    return (
                      <li key={item.title} className={`clause draw-rule${i === MARKED_INDEX ? " clause-marked" : ""}`} style={cssVars({ "--i": i, "--step": "70ms" })}>
                        <span aria-hidden="true" className="clause-no">
                          3.{i + 1}
                        </span>
                        <div className="clause-body">
                          <h3 className="clause-h">
                            {item.title}
                            {tag && (
                              <>
                                {" "}
                                <span className="aside-tag">{tag}</span>
                              </>
                            )}
                          </h3>
                          <p className="clause-p">
                            <ItemText text={item.text} marked={i === MARKED_INDEX} />
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
