// TODO: заменить на реальные контакты
export const siteConfig = {
  name: "UNIDEVELOPS",
  // Телефон для отображения и tel: ссылки
  phone: "+7 000 000-00-00",
  // WhatsApp: номер только цифрами, без плюса (для wa.me)
  whatsapp: "70000000000",
  // Telegram: username без @
  telegram: "username",
  email: "info@example.com",
} as const;

export const phoneHref = `tel:+${siteConfig.phone.replace(/\D/g, "")}`;
export const telegramHref = `https://t.me/${siteConfig.telegram}`;
export const emailHref = `mailto:${siteConfig.email}`;

export function whatsappHref(text?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
