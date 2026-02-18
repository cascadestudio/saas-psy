-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "batch_id" TEXT;

-- CreateIndex
CREATE INDEX "sessions_batch_id_idx" ON "sessions"("batch_id");
