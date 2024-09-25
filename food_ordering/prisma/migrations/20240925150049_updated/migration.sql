/*
  Warnings:

  - You are about to drop the column `itemId` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_itemId_fkey";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "itemId",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
