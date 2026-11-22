"use client";

import { useEffect } from "react";
import { track, type Goal } from "@/lib/analytics";

const HOSTS: Record<string, Goal> = {
  "wa.me": "click_whatsapp",
  "t.me": "click_telegram",
  "instagram.com": "click_instagram",
};

/** Один делегированный обработчик кликов на document: мессенджеры, соцсети и кнопки CTA (data-cta). */
export function ClickGoals() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!link) return;
      if (link.hasAttribute("data-cta")) {
        track("click_cta");
        return;
      }
      try {
        const host = new URL(link.getAttribute("href") ?? "", location.href).hostname.replace(/^www\./, "");
        const goal = HOSTS[host];
        if (goal) track(goal);
      } catch {
        /* некорректный href */
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
