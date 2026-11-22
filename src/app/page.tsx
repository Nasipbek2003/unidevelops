import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppTab } from "@/components/layout/WhatsAppTab";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Guarantees } from "@/components/sections/Guarantees";
import { Prices } from "@/components/sections/Prices";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <Prices />
        <Process />
        <Guarantees />
        <Reviews />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppTab />
    </>
  );
}
