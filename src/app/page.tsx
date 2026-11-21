import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppTab } from "@/components/layout/WhatsAppTab";
import { Hero } from "@/components/hero/Hero";
import { Advantages } from "@/components/sections/Advantages";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services />
        <Process />
        <Advantages />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppTab />
    </>
  );
}
