import "server-only";

import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "@/generated/prisma/client";

// Один PrismaClient на процесс. В dev hot reload заново выполняет модуль,
// поэтому экземпляр держим в globalThis, иначе каждое изменение кода
// открывает новый пул подключений к Neon.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Pooled-строка Neon (хост с -pooler). CLI и миграции берут DIRECT_URL
  // через prisma7.config.ts.
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL не задана. Шаблон переменных: .env.example");
  }

  // Драйвер Neon работает по WebSocket. В Node.js 22+ WebSocket встроен,
  // пакет ws не нужен.
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
