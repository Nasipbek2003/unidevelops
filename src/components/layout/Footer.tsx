import { Logo } from "@/components/brand/Logo";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { footer } from "@/content";
import { instagramHref, telegramHref, whatsappHref } from "@/config/site";

const LINK =
  "relative inline-flex h-11 items-center text-[16px] text-paper after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-orange-500 after:transition-transform after:duration-200 after:ease-out after:content-[''] hover:after:scale-x-100 focus-visible:outline-offset-[3px]";

function ColTitle({ children }: { children: string }) {
  return (
    <p className="label mb-2 text-mist">
      <span aria-hidden="true" className="mr-2 text-orange-500">
        /
      </span>
      {children}
    </p>
  );
}

export function Footer() {
  return (
    <footer className="on-dark relative overflow-clip bg-navy-950 pt-16 text-mist md:pt-24">
      <div className="wrap">
        <div className="pg gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Logo theme="dark" markClassName="h-9" />
            <p className="mt-6 max-w-[38ch] text-[16px] leading-relaxed text-mist">{footer.description}</p>
          </div>

          <nav aria-label={footer.colServices} className="col-span-2 md:col-span-3 lg:col-[5/span_3]">
            <ColTitle>{footer.colServices}</ColTitle>
            <ul>
              {footer.servicesLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={LINK}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={footer.colNav} className="col-span-2 md:col-span-3 lg:col-span-2">
            <ColTitle>{footer.colNav}</ColTitle>
            <ul>
              {footer.navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={LINK}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-4 md:col-span-2 lg:col-span-3">
            <ColTitle>{footer.colContacts}</ColTitle>
            <ul>
              <li>
                <a href={telegramHref} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Telegram
                </a>
              </li>
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={LINK}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={instagramHref} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="label mt-16 border-t border-paper/18 pt-6 text-mist">
          {footer.rightsBefore}
          <CurrentYear />
          {footer.rightsAfter}
        </p>
      </div>

      <div className="giant mt-10 text-center" aria-hidden="true">
        UNIDEVELOPS
      </div>
    </footer>
  );
}
