import { ButtonLink } from "@/components/ui/Button";
import { ArrowGlyph } from "@/components/ui/Glyphs";
import { InView } from "@/components/ui/InView";
import { SectionHead } from "@/components/ui/SectionHead";
import { contact } from "@/content";
import { telegramHref, whatsappHref } from "@/config/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="wrap">
        <div className="sect-in">
          <div className="sect-grid pg">
            <SectionHead
              id="contact-title"
              number={contact.number}
              title={contact.title}
              numberInTitle={false}
              lead={contact.lead}
              className="mb-12 md:mb-16 lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:col-[2/span_4] lg:mb-0 lg:self-start"
              aside={
                <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-1">
                  <ButtonLink
                    href={telegramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="h-[52px] justify-start"
                  >
                    <ArrowGlyph />
                    {contact.telegram}
                  </ButtonLink>
                  <ButtonLink
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="h-[52px] justify-start"
                  >
                    <ArrowGlyph />
                    {contact.whatsapp}
                  </ButtonLink>
                </div>
              }
            />

            <InView className="blank-wrap lg:col-[6/span_7]">
              <div className="blank">
                <span aria-hidden="true" className="blank-margin" />
                <span aria-hidden="true" className="blank-hole top-[22%]" />
                <span aria-hidden="true" className="blank-hole top-[72%]" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-4 right-2 z-10 scale-[0.8] md:-top-5 md:right-6 md:scale-100"
                >
                  <span className="stamp stamp-pop">{contact.stamp}</span>
                </div>
                <ContactForm />
              </div>
            </InView>
          </div>
        </div>
      </div>
    </section>
  );
}
