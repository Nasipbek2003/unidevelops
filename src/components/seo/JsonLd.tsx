import { priceNumber } from "@/components/ui/Price";
import { getSiteUrl, instagramHref, siteConfig, telegramHref, whatsappHref } from "@/config/site";
import { services, type ServiceItem } from "@/content";

function offer(item: ServiceItem) {
  const min = priceNumber(item.price);
  return {
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: item.title, description: item.text },
    // «после оценки»: цены нет, priceSpecification не выводим
    ...(min !== null && {
      priceSpecification: { "@type": "PriceSpecification", minPrice: min, priceCurrency: "KGS" },
    }),
  };
}

function catalog(name: string, items: readonly ServiceItem[]) {
  return { "@type": "OfferCatalog", name, itemListElement: items.map(offer) };
}

/** Структурированные данные главной: организация и каталог услуг. Только данные из content и config. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: getSiteUrl(),
    sameAs: [instagramHref, telegramHref],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: whatsappHref(),
      availableLanguage: "ru",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "UNIDEVELOPS",
      itemListElement: [
        catalog(services.science.name, services.science.items),
        catalog(services.web.name, services.web.items),
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
