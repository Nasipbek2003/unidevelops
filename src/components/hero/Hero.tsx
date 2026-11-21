import { LogoMark } from "@/components/brand/LogoMark";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowGlyph } from "@/components/ui/Glyphs";
import { FnList, FnMark } from "@/components/ui/Footnote";
import { Note } from "@/components/ui/Note";
import { Pen } from "@/components/ui/Pen";
import { fnNumber, footnotes, hero, margin } from "@/content";
import { cssVars } from "@/lib/utils";
import { HeroEditor } from "./HeroEditor";
import { HeroScene } from "./HeroScene";
import { TitleSheet } from "./TitleSheet";

const delay = (ms: number) => cssVars({ "--d": `${ms}ms` });

export function Hero() {
  const [serifBefore, serifMarked, serifAfter] = hero.h1Serif;

  return (
    <section id="hero" aria-labelledby="hero-title" tabIndex={-1} className="hero">
      <HeroScene>
        <div className="hero-pin">
          <div className="hero-text wrap">
            <p className="label rise tracking-[0.12em]" style={delay(0)}>
              <span aria-hidden="true" className="mr-2 text-orange-500">
                /
              </span>
              {hero.badge}
            </p>

            <h1 id="hero-title" className="h1 rise mt-5" style={delay(60)}>
              <span className="h1-serif">
                {serifBefore}
                <span className="pen-wrap">
                  {serifMarked}
                  <Pen
                    kind="underline"
                    onLoad
                    delay={500}
                    duration={600}
                    className="-bottom-[0.04em] left-0 h-[0.16em] w-full"
                  />
                </span>
                {serifAfter}
              </span>{" "}
              <span className="h1-mono rise" style={delay(140)}>
                <i aria-hidden="true" className="ln">
                  1
                </i>
                {hero.h1Mono}
                <i aria-hidden="true" className="caret" />
              </span>
            </h1>

            <div className="rise ml-[8%] mt-4 lg:mt-[clamp(4px,1svh,16px)]" style={delay(180)}>
              <Note rot={-3} arrow="up-left" load delay={600}>
                {margin.hero1}
              </Note>
            </div>

            <p className="lead rise mt-6 lg:mt-[clamp(12px,2.4svh,24px)]" style={delay(220)}>
              {hero.leadBefore}
              {hero.leadMarked}
              <FnMark n={fnNumber.hero} />
            </p>

            <div
              className="rise mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-8 lg:mt-[clamp(16px,3.2svh,32px)]"
              style={delay(300)}
            >
              <ButtonLink href="#contact" size="lg" arrow className="sm:w-auto">
                {hero.primary}
              </ButtonLink>
              <a href="#services" className="tlink">
                {hero.secondary}
                <ArrowGlyph />
              </a>
            </div>

            <ul className="mt-8 lg:mt-[clamp(14px,3svh,32px)] grid grid-cols-1 gap-x-8 gap-y-3 min-[480px]:grid-cols-2 lg:gap-x-6 xl:gap-x-8">
              {hero.chips.map((chip, i) => (
                <li
                  key={chip}
                  className="rise relative flex items-center gap-3 text-[16px] font-medium"
                  style={delay(380 + i * 60)}
                >
                  <span className="relative inline-block size-[18px] shrink-0 border-[1.5px] border-navy-800">
                    <Pen
                      kind="check"
                      onLoad
                      delay={900 + i * 120}
                      duration={350}
                      className="-left-[3px] -top-[8px] size-[26px]"
                    />
                  </span>
                  {chip}
                </li>
              ))}
            </ul>

            <FnList
              className="rise mt-10 lg:mt-[clamp(16px,3.5svh,40px)]"
              items={[{ n: fnNumber.hero, text: footnotes.hero }]}
            />
          </div>

          <div className="hero-artifact wrap fade-in" style={delay(100)}>
            <div className="artifact" aria-hidden="true">
              <div className="artifact-face">
                <div className="browser">
                  <div className="browser-chrome">
                    <span className="browser-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="browser-url">
                      <span className="block h-3.5 shrink-0">
                        <LogoMark theme="light" />
                      </span>
                      UNIDEVELOPS
                    </span>
                  </div>
                  <div className="browser-body">
                    <div className="sheet-slot">
                      <TitleSheet />
                    </div>
                    <div className="site">
                      <div className="flex gap-1.5">
                        <i className="soft h-1.5 w-6" />
                        <i className="soft h-1.5 w-8" />
                        <i className="soft h-1.5 w-5" />
                        <i className="soft h-1.5 w-7" />
                      </div>
                      <div className="mt-5 space-y-1.5">
                        <i className="ink h-3.5 w-[92%]" />
                        <i className="ink h-3.5 w-[74%]" />
                        <i className="ink h-3.5 w-[52%]" />
                      </div>
                      <i className="mt-5 h-[22px] w-20 border border-navy-900 bg-orange-500" />
                      <div className="mt-5 space-y-2">
                        <i className="soft h-[5px] w-full" />
                        <i className="soft h-[5px] w-[90%]" />
                        <i className="soft h-[5px] w-[96%]" />
                        <i className="soft h-[5px] w-[58%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sheet-anchor">
                  <svg
                    className="paperclip"
                    viewBox="0 0 22 56"
                    fill="none"
                    stroke="#1B3650"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 40V12a4 4 0 0 1 8 0v34a7 7 0 0 1-14 0V16" />
                  </svg>
                  <div className="sticker">
                    <div className="sticker-in">
                      <b>{hero.sticker.title}</b>
                      <span>{hero.sticker.caption}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hero-note">
                <Note rot={2} arrow="up-left" load delay={900}>
                  {margin.hero2}
                </Note>
              </div>

              <div className="artifact-editor">
                <HeroEditor />
              </div>

              <div className="artifact-stamp">
                <b>{hero.stamp.title}</b>
                <span>{hero.stamp.caption}</span>
              </div>
            </div>
          </div>
        </div>
      </HeroScene>
    </section>
  );
}
