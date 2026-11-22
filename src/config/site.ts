export const siteConfig = {
  name: "UNIDEVELOPS",
  // WhatsApp: номер только цифрами, без плюса (для wa.me)
  whatsapp: "996501306722",
  // Telegram: username без @
  telegram: "nnbek23",
  // Instagram: username без @
  instagram: "unidevelops",
} as const;

/** Цифры владельца. Показываются на странице только из этих данных, в разметке руками не пишутся. */
export const stats = {
  /** Студентам помогли, все сдали */
  students: 435,
  /** Оригинальность работ: от, % */
  originality: 90,
  /** Доля ИИ-контента: меньше, % */
  ai: 10,
} as const;

/** Состав команды (без имён, фото, стажа). */
export const team = {
  authors: 4,
  developers: 2,
} as const;

/**
 * Адрес сайта без слеша в конце. Порядок: NEXT_PUBLIC_SITE_URL, затем домен production на Vercel
 * (VERCEL_PROJECT_PRODUCTION_URL, без протокола), иначе localhost для разработки.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`.replace(/\/+$/, "");
  return "http://localhost:3000";
}

export const telegramHref = `https://t.me/${siteConfig.telegram}`;
export const instagramHref = `https://www.instagram.com/${siteConfig.instagram}/`;

export function whatsappHref(text?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
