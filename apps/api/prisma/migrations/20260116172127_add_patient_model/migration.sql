/*
  Warnings:

  - You are about to drop the column `patient_email` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `patient_first_name` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `patient_last_name` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `patient_pseudo_id` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `patient_id` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "patient_email",
DROP COLUMN "patient_first_name",
DROP COLUMN "patient_last_name",
DROP COLUMN "patient_pseudo_id",
ADD COLUMN     "patient_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3),
    "notes" TEXT,
    "practitioner_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "patients_practitioner_id_idx" ON "patients"("practitioner_id");

-- CreateIndex
CREATE INDEX "patients_email_idx" ON "patients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "patients_practitioner_id_email_key" ON "patients"("practitioner_id", "email");

-- CreateIndex
CREATE INDEX "sessions_patient_id_idx" ON "sessions"("patient_id");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_practitioner_id_fkey" FOREIGN KEY ("practitioner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
