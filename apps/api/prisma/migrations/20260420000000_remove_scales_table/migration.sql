-- Drop foreign key constraint from sessions to scales
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_scale_id_fkey";

-- Drop the scales table
DROP TABLE "scales";
