-- Migrate any CREATED sessions to SENT before removing the enum value
UPDATE "sessions" SET "status" = 'SENT' WHERE "status" = 'CREATED';

-- Recreate the enum without CREATED (PostgreSQL doesn't support DROP VALUE)
ALTER TYPE "SessionStatus" RENAME TO "SessionStatus_old";
CREATE TYPE "SessionStatus" AS ENUM ('SENT', 'STARTED', 'COMPLETED', 'EXPIRED', 'CANCELLED');

-- Re-apply the enum to the column
ALTER TABLE "sessions"
  ALTER COLUMN "status" DROP DEFAULT,
  ALTER COLUMN "status" TYPE "SessionStatus" USING "status"::text::"SessionStatus",
  ALTER COLUMN "status" SET DEFAULT 'SENT';

DROP TYPE "SessionStatus_old";
