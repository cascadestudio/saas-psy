/*
  Warnings:

  - You are about to drop the column `favorite_questionnaires` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `questionnaire_id` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the `questionnaires` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `scale_id` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_questionnaire_id_fkey";

-- DropIndex
DROP INDEX "sessions_questionnaire_id_idx";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "favorite_questionnaires",
ADD COLUMN     "favorite_scales" TEXT[];

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "questionnaire_id",
ADD COLUMN     "scale_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "questionnaires";

-- CreateTable
CREATE TABLE "scales" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "estimated_time" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "answer_scales" JSONB,
    "scoring" JSONB,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "requires_auth" BOOLEAN NOT NULL DEFAULT false,
    "copyright_info" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sessions_scale_id_idx" ON "sessions"("scale_id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_scale_id_fkey" FOREIGN KEY ("scale_id") REFERENCES "scales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
