import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req: NextRequest) {
  try {
    let reviews = await prisma.reviews.findMany({});
    let avg_reviews = await prisma.reviews.aggregate({
      _avg: {
        rating: true,
      },
    });
    return NextResponse.json({
      message: "Review fetched successfully",
      reviews: reviews,
      avgReviews: avg_reviews,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
