This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## База данных

Заявки хранятся в Neon PostgreSQL через Prisma 7 (драйвер-адаптер `@prisma/adapter-neon`). Схема: `prisma/schema.prisma`, конфиг CLI: `prisma7.config.ts`, клиент для серверного кода: `src/lib/db.ts`.

Переменные окружения (шаблон в [`.env.example`](.env.example), скопируйте его в `.env`):

- `DATABASE_URL`: pooled-подключение Neon (хост с `-pooler`), его использует приложение;
- `DIRECT_URL`: прямое подключение (тот же хост без `-pooler`), его используют Prisma CLI и миграции.

Prisma Client генерируется в `src/generated/prisma` (в git не попадает) автоматически при `npm install` и `npm run build`.

Применить миграции к базе:

```bash
npx prisma migrate deploy
```

На Vercel обе переменные, `DATABASE_URL` и `DIRECT_URL`, задаются в Project Settings → Environment Variables.

Prisma 7 требует Node.js 20.19+, 22.12+ или 24+. На Node 23 `npm install` падает на проверке версии в пакете `prisma`.
