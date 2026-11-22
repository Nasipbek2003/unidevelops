import { Pen } from "@/components/ui/Pen";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { redpen, titlepage as t } from "@/content";
import { cssVars } from "@/lib/utils";

/** Титульный лист курсовой, свёрстанный в HTML/CSS. Размеры в cqw: лист масштабируется как картинка. */
export function TitleSheet() {
  return (
    <div className="sheet">
      <div className="sheet-frame">
        <div className="tp-head">
          <p className="tp-univ">{t.university}</p>
          <p className="tp-fac">{t.faculty}</p>
        </div>

        <div>
          <p className="tp-type">{t.type}</p>
          <p className="tp-topic">
            {t.topicBefore}
            <span className="pen-wrap">
              {t.topicMarked}
              <Pen
                kind="circle"
                onLoad
                delay={700}
                duration={450}
                className="-left-[12%] -top-[34%] h-[170%] w-[124%]"
              />
            </span>
            {t.topicAfter}
            <Pen
              kind="underline"
              onLoad
              delay={850}
              duration={450}
              className="bottom-[-2.4cqw] left-[22%] h-[2.4cqw] w-[56%]"
            />
          </p>
          <p className="redpen redpen-flow fade-in" style={cssVars({ "--d": "1000ms" })}>
            {redpen[1]}
          </p>
        </div>

        <div>
          <p className="tp-sign">
            {t.author}
            <span className="tp-line" />
          </p>
          <p className="tp-sign">
            <span className="tp-sign-text">{t.reviewer}</span>
            <span className="tp-line">
              <Pen
                kind="check"
                onLoad
                delay={1000}
                duration={450}
                className="bottom-[1.2cqw] right-[1cqw] h-[7cqw] w-[7cqw]"
              />
              <span className="redpen fade-in bottom-[1.6cqw] right-[10cqw] rotate-[3deg]" style={cssVars({ "--d": "1150ms" })}>
                {redpen[2]}
              </span>
            </span>
          </p>
        </div>

        <p className="tp-city">
          {t.cityPrefix}
          <CurrentYear />
        </p>
      </div>
    </div>
  );
}
