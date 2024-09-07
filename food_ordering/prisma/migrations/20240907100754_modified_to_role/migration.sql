/*
  Warnings:

  - You are about to drop the column `type` on the `Users` table. All the data in the column will be lost.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "roletype" AS ENUM ('Admin', 'User');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "type",
ADD COLUMN     "role" "roletype" NOT NULL;

-- DropEnum
DROP TYPE "usertype";
