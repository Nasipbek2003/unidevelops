// Конфиг Prisma CLI (generate, migrate, db). Имя prisma7.config.ts: так его
// создаёт `prisma init` в Prisma 7.10, а prisma.config.ts там помечен как legacy.
import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";

// Prisma 7 не читает .env сам. Грузим его так же, как Next.js
// (см. node_modules/next/dist/docs/01-app/02-guides/environment-variables.md).
// Уже заданные переменные (Vercel Environment Variables) не перезаписываются.
loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // CLI и миграции идут напрямую, без пулера Neon. Приложение берёт
    // DATABASE_URL (pooled) в src/lib/db.ts.
    // process.env, а не env(): `prisma generate` в сборке не должен падать,
    // если строки подключения нет.
    url: process.env.DIRECT_URL,
  },
});
