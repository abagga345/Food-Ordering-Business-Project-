/*
  Warnings:

  - You are about to drop the column `city` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "city",
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'delhi';
