# Ревью, круг 1 (функциональная часть, до редизайна), 2026-11-18

## Критично: React #418 при prefers-reduced-motion
- Причина: src/components/brand/AnimatedLogoMark.tsx:49 — useReducedMotion() из motion/react: на сервере null, в браузере true до первого рендера → при reduced компонент рендерит <motion.span> вместо <svg> → несовпадение разметки при гидратации.
- Ещё 7 мест с useReducedMotion() в initial/transition (рассинхрон стилей в dev): AnimatedLogoMark.tsx:153, Hero.tsx:74, ui/Reveal.tsx:38, Services.tsx:136, Faq.tsx:34, Process.tsx:46, FloatingButtons.tsx:17.
- Исправление (проверено): в src/lib/useMediaQuery.ts добавить
  export function usePrefersReducedMotion(): boolean { return useMediaQuery("(prefers-reduced-motion: reduce)"); }
  (useSyncExternalStore, на сервере и при гидратации false). Заменить все useReducedMotion() на него. <MotionConfig reducedMotion="user"> в AppProviders оставить. В eslint.config.mjs добавить no-restricted-imports на useReducedMotion из motion/react.
- Принцип: на первом рендере не ветвить DOM по window/matchMedia/sessionStorage/Date — только useSyncExternalStore с getServerSnapshot.

## Важно
1. ContactForm.tsx:115 и 210–212 — ошибки озвучиваются дважды (role="alert" на <p> + sr-only alert). Убрать role у <p> (есть aria-describedby), оставить один постоянный sr-only alert; при повторной отправке очищать текст и ставить его в requestAnimationFrame.
2. Header.tsx:187–193 и 218–224 — кнопка «Закрыть меню» вне role="dialog" aria-modal="true". Перенести кнопку внутрь диалога или убрать aria-modal и ставить inert на main/footer/плавающие кнопки.
3. src/config/site.ts:5–10 — заглушки контактов (wa.me/70000000000, t.me/username, info@example.com, +70000000000). Блокер релиза; ждём данные заказчика.

## Мелочи
4. useMediaQuery.ts:11–15 — subscribe пересоздаётся каждый рендер → useCallback([query]) или кеш по query.
5. FloatingButtons.tsx:23–28 — setState на каждом кадре скролла → хранить только булевы с проверкой prev === next.
6. FloatingButtons.tsx:80 — scrollTo smooth игнорирует reduced-motion → behavior: reduced ? "auto" : "smooth".
7. Faq.tsx:87 — rotate: open && !reduced → rotate: open ? 45 : 0.
8. Header.tsx:67–73, 250 — после клика по пункту меню фокус возвращается на бургер; должен уходить в целевую секцию (tabIndex={-1}, focus({preventScroll:true})). На бургер — только при Esc/крестике.
9. useIsDesktop() в initial анимаций не срабатывает (на гидратации false) — HeroVisual.tsx:328–329, 346–347, Hero.tsx:76. Различия по брейкпоинтам задавать через CSS/варианты.
10. ContactForm.tsx:40, content/index.ts:359 — текста ошибки имени нет в copy.md, регулярка противоречит тексту. Взять текст из copy.md или убрать проверку.
11. Footer.tsx:36 — год фиксируется при сборке → клиентский компонент года с suppressHydrationWarning.

## Работает корректно
Мобильное меню (aria-expanded, блокировка скролла, фокус-ловушка, Esc), форма (валидация, encodeURIComponent, window.open wa.me с noopener, aria-live), якоря, один h1, lang="ru", metadata/OG, next/font. lint и build проходят.
Проверенная копия с исправлением #418: C:\Users\HP\AppData\Local\Temp\claude\506909315bd5429a\f6f59492-f8df-49d1-b465-3649549b7951\scratchpad\fixcopy\src
