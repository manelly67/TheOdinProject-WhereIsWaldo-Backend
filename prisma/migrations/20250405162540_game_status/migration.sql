-- CreateEnum
CREATE TYPE "Status" AS ENUM ('GAMING', 'ENDED', 'ABORTED');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'GAMING';
