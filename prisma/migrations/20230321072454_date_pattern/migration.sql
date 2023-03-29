-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "joinDate" SET DEFAULT to_timestamp('now', 'YYYY-MM-DDMonth HH24:MI:SS');
