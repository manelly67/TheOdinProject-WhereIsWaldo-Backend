/*
  Warnings:

  - You are about to drop the column `bottomX` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `leftY` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `rightY` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `topX` on the `Character` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "bottomX",
DROP COLUMN "leftY",
DROP COLUMN "rightY",
DROP COLUMN "topX";
