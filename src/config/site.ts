export const siteConfig = {
  name: "UNIDEVELOPS",
  // WhatsApp: номер только цифрами, без плюса (для wa.me)
  whatsapp: "996501306722",
  // Telegram: username без @
  telegram: "nnbek23",
  // Instagram: username без @
  instagram: "unidevelops",
} as const;

export const telegramHref = `https://t.me/${siteConfig.telegram}`;
export const instagramHref = `https://www.instagram.com/${siteConfig.instagram}/`;

export function whatsappHref(text?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
