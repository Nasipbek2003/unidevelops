import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppTab } from "@/components/layout/WhatsAppTab";
import { ArrowGlyph } from "@/components/ui/Glyphs";
import { Pen } from "@/components/ui/Pen";
import { notFound } from "@/content";
import { cssVars } from "@/lib/utils";

export const metadata: Metadata = {
  title: notFound.metaTitle,
  robots: { index: false },
};

const delay = (ms: number) => cssVars({ "--d": `${ms}ms` });

/** Страница 404: работа, возвращённая на доработку. Лист с красным «404», без сцены и скролла. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="nf">
        <div className="wrap w-full">
          <div className="pg items-center">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <p className="label rise tracking-[0.12em]" style={delay(0)}>
                <span aria-hidden="true" className="mr-2 text-orange-500">
                  /
                </span>
                {notFound.code}
              </p>
              <h1 className="h1 rise mt-5 max-w-[14ch]" style={delay(60)}>
                {notFound.title}
              </h1>
              <p className="lead rise mt-6" style={delay(140)}>
                {notFound.text}
              </p>
              <div
                className="rise mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-8"
                style={delay(220)}
              >
                <Link href="/" className="btn btn-primary btn-lg sm:w-auto">
                  {notFound.button}
                  <ArrowGlyph />
                </Link>
                <Link href="/#services" className="tlink">
                  {notFound.link}
                  <ArrowGlyph />
                </Link>
              </div>
            </div>

            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <div className="nf-sheet fade-in" style={delay(100)} aria-hidden="true">
                <div className="sheet">
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
                  <div className="sheet-frame">
                    <p className="nf-brand">UNIDEVELOPS</p>
                    <div className="grid">
                      <span className="nf-code">
                        {notFound.sheetNumber}
                        <Pen
                          kind="circle"
                          onLoad
                          delay={500}
                          duration={450}
                          className="-left-[8%] -top-[10%] h-[120%] w-[116%]"
                        />
                      </span>
                    </div>
                    <div className="nf-lines">
                      <i />
                      <i>
                        <Pen
                          kind="strike"
                          onLoad
                          delay={800}
                          duration={350}
                          className="-left-[4%] top-1/2 h-[1.4cqw] w-[108%] -translate-y-1/2"
                        />
                      </i>
                      <i />
                    </div>
                  </div>
                  <p className="redpen nf-redpen fade-in" style={delay(900)}>
                    {notFound.redpen}
                  </p>
                  <p className="nf-stamp">{notFound.stamp}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppTab />
    </>
  );
}
