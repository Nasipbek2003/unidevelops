import { FnList } from "@/components/ui/Footnote";
import { SectionHead } from "@/components/ui/SectionHead";
import { fnNumber, footnotes, process } from "@/content";
import { ProcessList } from "./ProcessList";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" tabIndex={-1} className="grid-paper">
      <div className="wrap">
        <div className="sect-in">
          <div className="sect-grid pg">
            <SectionHead
              id="process-title"
              number={process.number}
              title={process.title}
              lead={process.lead}
            />
            <ProcessList />
            <FnList className="mt-10" items={[{ n: fnNumber.process, text: footnotes.process }]} />
          </div>
        </div>
      </div>
    </section>
  );
}
