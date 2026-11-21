-- CreateEnum
CREATE TYPE "work_type" AS ENUM ('COURSEWORK', 'THESIS', 'MASTERS_THESIS', 'ARTICLE', 'ESSAY', 'PRACTICE_REPORT', 'WEBSITE', 'WEB_APP', 'OTHER');

-- CreateEnum
CREATE TYPE "lead_status" AS ENUM ('NEW', 'IN_PROGRESS', 'DONE', 'REJECTED');

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "work_type" "work_type" NOT NULL,
    "deadline" VARCHAR(100),
    "comment" TEXT,
    "status" "lead_status" NOT NULL DEFAULT 'NEW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "leads_status_created_at_idx" ON "leads"("status", "created_at");
