-- AlterEnum
BEGIN;
CREATE TYPE "work_type_new" AS ENUM ('SRS', 'ESSAY', 'PRESENTATION', 'COURSEWORK', 'THESIS', 'MASTERS_THESIS', 'ARTICLE', 'PRACTICE_REPORT', 'DEV_PROJECT', 'OTHER');
ALTER TABLE "leads" ALTER COLUMN "work_type" TYPE "work_type_new" USING ("work_type"::text::"work_type_new");
ALTER TYPE "work_type" RENAME TO "work_type_old";
ALTER TYPE "work_type_new" RENAME TO "work_type";
DROP TYPE "public"."work_type_old";
COMMIT;

