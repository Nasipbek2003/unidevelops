import { InView } from "@/components/ui/InView";
import { Pen } from "@/components/ui/Pen";
import { SectionHead } from "@/components/ui/SectionHead";
import { Tally } from "@/components/ui/Tally";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { about, margin } from "@/content";
import { cssVars } from "@/lib/utils";
import { team } from "@/config/site";

/** «4 автора», «2 разработчика»: число из данных, склонение слова по числу. */
function count(n: number, forms: readonly [one: string, few: string, many: string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  const word = mod10 === 1 && mod100 !== 11 ? forms[0] : mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20) ? forms[1] : forms[2];
  return `${n} ${word}`;
}

const AUTHORS = ["автор", "автора", "авторов"] as const;
const DEVS = ["разработчик", "разработчика", "разработчиков"] as const;

/** § 5 «О нас»: оборот титульного листа с «авторским коллективом», роли без имён, палочки учёта. */
export function About() {
  const a = about;
  return (
    <section id="about" aria-labelledby="about-title" tabIndex={-1}>
      <div className="wrap">
        <div className="sect-in">
          <div className="sect-grid pg">
            <SectionHead
              id="about-title"
              number={a.number}
              title={a.title}
              lead={a.lead}
              className="mb-12 md:mb-16 lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:col-[2/span_4] lg:mb-0 lg:self-start"
              aside={
                <div className="about-text mt-8 max-w-[36rem] text-body">
                  {a.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              }
            />

            <InView className="lg:col-[6/span_7]">
              <div className="verso" role="group" aria-labelledby="verso-title">
                <h3 id="verso-title" className="label text-center tracking-[0.1em]">
                  {a.versoTitle}
                </h3>
                <div className="dbl-rule dbl-rule-draw" aria-hidden="true" />

                {team.authors > 0 ? (
                  <div className="role">
                    <Tally count={team.authors} delay={400} />
                    <div>
                      <h4>{a.authors.title}</h4>
                      <p className="role-count">{count(team.authors, AUTHORS)}</p>
                      <p className="role-text">{a.authors.text}</p>
                    </div>
                  </div>
                ) : null}

                {team.authors > 0 && team.developers > 0 ? (
                  <div className="role-sep" aria-hidden="true">
                    <span className="role-plus">
                      <Pen kind="plus" delay={400 + (team.authors + team.developers) * 120} duration={350} className="inset-0 size-full" />
                    </span>
                    {margin.about ? (
                      <span aria-hidden="true" className="role-note note" style={cssVars({ "--rot": "-2deg" })}>
                        {margin.about}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                {team.developers > 0 ? (
                  <div className="role">
                    <Tally count={team.developers} delay={400 + team.authors * 120} />
                    <div>
                      <h4>{a.devs.title}</h4>
                      <p className="role-count">{count(team.developers, DEVS)}</p>
                      <p className="role-text">{a.devs.text}</p>
                    </div>
                  </div>
                ) : null}

                <div className="dbl-rule-1 mt-8" aria-hidden="true" />
                <p className="imprint">
                  {a.imprintBefore}
                  <CurrentYear />
                  {a.imprintAfter}
                </p>
              </div>
            </InView>
          </div>
        </div>
      </div>
    </section>
  );
}
