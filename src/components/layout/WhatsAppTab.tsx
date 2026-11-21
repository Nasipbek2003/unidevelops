"use client";

import { useEffect, useRef } from "react";
import { ChatGlyph } from "@/components/ui/Glyphs";
import { header } from "@/content";
import { whatsappHref } from "@/config/site";

/**
 * Плавающая кнопка WhatsApp (на <768 стикер, на >=768 закладка у края).
 * Видимость: hero ушёл, форма и подвал не в кадре. Состояние пишется атрибутом data-visible
 * напрямую в DOM, начальное состояние «скрыто» одинаково на сервере и клиенте.
 */
export function WhatsAppTab() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    const hero = document.getElementById("hero");
    const contactSection = document.getElementById("contact");
    const footer = document.querySelector("footer");
    if (!el || !hero || !contactSection || !footer) return;

    const state = { hero: true, contact: false, footer: false };
    const update = () => {
      const visible = !state.hero && !state.contact && !state.footer;
      if (el.hasAttribute("data-visible") !== visible) el.toggleAttribute("data-visible", visible);
    };
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) state.hero = entry.isIntersecting;
        if (entry.target === contactSection) state.contact = entry.isIntersecting;
        if (entry.target === footer) state.footer = entry.isIntersecting;
      }
      update();
    });
    io.observe(hero);
    io.observe(contactSection);
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={header.whatsapp}
      className="wa"
    >
      <span className="wa-in">
        <ChatGlyph className="md:hidden" />
        <span className="wa-text" aria-hidden="true">
          {header.whatsapp}
        </span>
      </span>
    </a>
  );
}
