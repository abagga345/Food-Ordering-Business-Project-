-- CreateEnum
CREATE TYPE "paymentMethods" AS ENUM ('COD', 'UPI', 'StorePayment');

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "paymentMethod" "paymentMethods" NOT NULL DEFAULT 'COD';
