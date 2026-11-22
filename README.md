# UNIDEVELOPS

Лендинг сервиса научных работ на заказ для студентов (Кыргызстан, цены в сомах). Основное направление: курсовые, дипломные, магистерские, статьи, СРС, презентации. Разработка (сайт, магазин, веб-приложение, доработка кода) входит только как программная часть к учебным проектам. Заявка с формы уходит в WhatsApp с готовым сообщением.

## Стек

- Next.js 16 (App Router, Turbopack), React 19
- TypeScript, Tailwind CSS 4
- Motion (анимации)
- Prisma 7 + Neon PostgreSQL (схема и миграции готовы, форма к базе пока не подключена)
- Шрифты: `next/font/google` (Cormorant, Golos Text, JetBrains Mono, Marck Script); для OG-картинки статичные TTF лежат в `src/app/og/fonts/`

В этой версии Next.js есть отличия от привычной: перед работой с API читайте `node_modules/next/dist/docs/` (см. `AGENTS.md`).

## Требования

- Node.js 24 LTS или 22 LTS (Prisma 7 требует 20.19+, 22.12+ или 24+). На Node 23 `npm install` падает на проверке версии в пакете `prisma`.
- npm

## Запуск

```bash
npm install
cp .env.example .env   # подставьте строки подключения Neon (см. «База данных»)
npm run dev
```

Сайт откроется на http://localhost:3000.

## Скрипты

| Команда | Что делает |
|---|---|
| `npm run dev` | dev-сервер |
| `npm run build` | `prisma generate` и production-сборка |
| `npm start` | запуск собранного приложения |
| `npm run lint` | ESLint |

## Переменные окружения

Шаблон: [`.env.example`](.env.example). Файл `.env` в git не попадает.

| Переменная | Назначение |
|---|---|
| `DATABASE_URL` | pooled-подключение Neon (хост с `-pooler`), для приложения |
| `DIRECT_URL` | прямое подключение Neon, для Prisma CLI и миграций |
| `NEXT_PUBLIC_SITE_URL` | публичный адрес сайта (canonical, Open Graph, sitemap, robots, JSON-LD). Если не задан: `https://$VERCEL_PROJECT_PRODUCTION_URL`, иначе `http://localhost:3000` |
| `NEXT_PUBLIC_YM_ID` | номер счётчика Яндекс Метрики; без него счётчик не подключается |
| `NEXT_PUBLIC_GA_ID` | ID Google Analytics 4 (`G-...`); без него не подключается |

Переменные `NEXT_PUBLIC_*` подставляются при сборке: после их изменения нужна пересборка.

## База данных

Заявки хранятся в Neon PostgreSQL через Prisma 7 (драйвер-адаптер `@prisma/adapter-neon`). Схема: `prisma/schema.prisma`, конфиг CLI: `prisma7.config.ts`, клиент для серверного кода: `src/lib/db.ts`.

- `DATABASE_URL`: pooled-подключение Neon (хост с `-pooler`), его использует приложение;
- `DIRECT_URL`: прямое подключение (тот же хост без `-pooler`), его используют Prisma CLI и миграции.

Prisma Client генерируется в `src/generated/prisma` (в git не попадает) автоматически при `npm install` и `npm run build`.

Применить миграции к базе:

```bash
npx prisma migrate deploy
```

Enum `WorkType` в схеме совпадает со списком `workTypes` в `src/content/index.ts` (поле «Тип работы» формы). Меняете список: обновите enum и создайте миграцию.

## Аналитика и цели

Включается переменными `NEXT_PUBLIC_YM_ID` и `NEXT_PUBLIC_GA_ID`; без них скрипты не рендерятся, а `track()` ничего не делает. Вебвизор Яндекс Метрики выключен намеренно: он записывает поля формы с личными данными.

Цели (отправляет `track(goal)` из `src/lib/analytics.ts`):

| Цель | Когда |
|---|---|
| `lead_submit` | успешная отправка формы, перед открытием WhatsApp |
| `click_whatsapp` | клик по ссылке на wa.me |
| `click_telegram` | клик по ссылке на t.me |
| `click_instagram` | клик по ссылке на instagram.com |
| `click_cta` | клик по кнопке-ссылке на форму заявки (ссылка с `#contact` у `ButtonLink`, атрибут `data-cta`) |

Клики обрабатывает один делегированный обработчик на `document` (`src/components/analytics/ClickGoals.tsx`). В Метрике и GA4 цели с этими именами нужно создать как события.

## SEO

- `src/app/layout.tsx`: metadata (title, description, canonical, Open Graph, Twitter);
- `src/app/opengraph-image.tsx` и `twitter-image.tsx`: OG-картинка 1200x630 (`next/og`), генерируется при сборке;
- `src/app/robots.ts`, `src/app/sitemap.ts`;
- `src/components/seo/JsonLd.tsx`: JSON-LD (организация и каталог услуг из `src/content` и `src/config`);
- 404 отдаётся с `noindex`.

## Структура

```
docs/                    спецификации и отчёты ревью
prisma/                  схема и миграции
public/                  статика
src/app/                 страницы, layout, 404, OG-картинка, robots, sitemap, globals.css
src/app/og/fonts/        статичные TTF для OG-картинки и лицензии OFL
src/components/          hero, sections (§ 1–7), layout, ui, brand, analytics, seo, providers
src/config/site.ts       контакты, цифры владельца, адрес сайта
src/content/index.ts     все тексты (источник: docs/copy.md)
src/lib/                 db.ts, analytics.ts, утилиты
```

## Спецификации

- `docs/design.md`: дизайн-спецификация (версия 2.1);
- `docs/copy.md`: тексты;
- `docs/review-1.md`, `docs/review-redesign-1.md`, `docs/review-redesign-2.md`, `docs/review-redesign-3.md`: отчёты ревью.

## Деплой на Vercel

1. Импортируйте репозиторий в Vercel.
2. В Project Settings → Environment Variables задайте `DATABASE_URL`, `DIRECT_URL` и, по мере готовности, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_YM_ID`, `NEXT_PUBLIC_GA_ID`.
3. Примените миграции: `npx prisma migrate deploy` (локально с теми же `DIRECT_URL`).
4. Деплой: сборка выполняет `prisma generate` и `next build`.
