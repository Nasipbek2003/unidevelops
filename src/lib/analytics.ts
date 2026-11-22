/**
 * Цели аналитики. Яндекс Метрика и GA4 подключаются через переменные окружения
 * (src/components/analytics/Analytics.tsx); без них track() ничего не делает.
 */
export type Goal = "lead_submit" | "click_whatsapp" | "click_telegram" | "click_instagram" | "click_cta";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export const YM_ID = /^\d+$/.test(process.env.NEXT_PUBLIC_YM_ID ?? "") ? Number(process.env.NEXT_PUBLIC_YM_ID) : null;
export const GA_ID = /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID ?? "") ? (process.env.NEXT_PUBLIC_GA_ID as string) : null;

/** Отправляет цель в подключённые системы. Никогда не бросает исключение. */
export function track(goal: Goal): void {
  if (typeof window === "undefined") return;
  try {
    if (YM_ID !== null && typeof window.ym === "function") window.ym(YM_ID, "reachGoal", goal);
  } catch {
    /* аналитика не должна ломать страницу */
  }
  try {
    if (GA_ID !== null && typeof window.gtag === "function") window.gtag("event", goal);
  } catch {
    /* см. выше */
  }
}
