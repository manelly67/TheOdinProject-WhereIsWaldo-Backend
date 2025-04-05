/*
  Warnings:

  - You are about to drop the column `found` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "found";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "targets" JSONB[];
