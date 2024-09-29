import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req: NextRequest) {
  try {
    const currentYear = new Date().getFullYear();
    const monthSales = await prisma.monthlySales.findMany({
      where: {
        year: currentYear,
      },
      select: {
        month: true,
        totalSales: true,
      },
      orderBy: {
        month: 'asc',
      },
    });
    const allMonthSales = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      const foundSale = monthSales.find(sale => sale.month === month);
    
      return {
        month: month,
        totalSales: foundSale ? foundSale.totalSales : 0,
      };
    });
    return NextResponse.json(allMonthSales, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
