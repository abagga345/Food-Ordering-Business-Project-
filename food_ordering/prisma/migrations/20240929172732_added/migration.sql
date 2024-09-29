-- CreateTable
CREATE TABLE "MonthlySales" (
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "totalSales" INTEGER NOT NULL,

    CONSTRAINT "MonthlySales_pkey" PRIMARY KEY ("year","month")
);
