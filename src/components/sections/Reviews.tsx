import { SectionHead } from "@/components/ui/SectionHead";
import { reviews } from "@/content";
import { ReviewStack } from "./ReviewStack";

/** Приложение А «Отзывы студентов»: стопка вклеек из WhatsApp (design.md 4.16). */
export function Reviews() {
  const r = reviews;
  return (
    <section id="reviews" className="rv" aria-labelledby="reviews-title" tabIndex={-1}>
      <div className="wrap">
        <div className="sect-in">
          <div className="sect-grid pg">
            <SectionHead
              id="reviews-title"
              number={r.number}
              title={r.title}
              lead={r.lead}
              className="mb-10 md:mb-14 lg:mb-16"
              rail={
                <>
                  <span className="rail-pre">{r.railPre}</span>
                  {r.railLetter}
                </>
              }
            />

            <ReviewStack />

            {/* Скриншоты для скринридера: стопка aria-hidden, текст отзывов здесь */}
            <div className="sr-only">
              <h3>{r.srTitle}</h3>
              <ol>
                {r.items.map((it, i) => (
                  <li key={it.text}>
                    {r.figPrefix}
                    {i + 1}. <span lang={it.lang}>{it.text}</span>
                    {it.reply ? ` ${r.ourReply}: ${it.reply}` : null}
                    {it.translation ? ` ${r.translationPrefix}: ${it.translation}` : null}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
