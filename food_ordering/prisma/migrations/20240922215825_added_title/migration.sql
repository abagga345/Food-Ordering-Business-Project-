/*
  Warnings:

  - Added the required column `title` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "title" TEXT NOT NULL;
