-- AlterTable: onboarding email sequence tracking
ALTER TABLE "users" ADD COLUMN "onboarding_day3_sent_at" TIMESTAMP(3);
ALTER TABLE "users" ADD COLUMN "onboarding_day14_sent_at" TIMESTAMP(3);

-- Backfill: mark all existing users as already past the onboarding sequence
-- so the scheduler only targets users who sign up AFTER this migration.
-- Without this, every current beta tester would receive the J+3 and J+14
-- emails at once on the next cron run.
UPDATE "users"
SET "onboarding_day3_sent_at"  = NOW(),
    "onboarding_day14_sent_at" = NOW();
