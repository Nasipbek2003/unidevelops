import { ButtonLink } from "@/components/ui/Button";
import { FnList } from "@/components/ui/Footnote";
import { SectionHead } from "@/components/ui/SectionHead";
import { fnNumber, footnotes, services } from "@/content";
import { ScienceDeck } from "./ScienceDeck";
import { WebTabs } from "./WebTabs";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" tabIndex={-1} className="overflow-x-clip">
      <div className="wrap">
        <div className="sect-in">
          <div className="sect-grid pg">
            <SectionHead
              id="services-title"
              number={services.number}
              title={services.title}
              lead={services.lead}
              className="mb-12 md:mb-16 lg:mb-32"
            />

            <ScienceDeck headingId="sci-title" />

            <WebTabs />

            <div className="mt-12 md:mt-16 lg:col-[5/span_8]">
              <ButtonLink href="#contact" size="lg" arrow className="w-full sm:w-auto">
                {services.cta}
              </ButtonLink>
              <FnList className="mt-12" items={[{ n: fnNumber.services, text: footnotes.services }]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
