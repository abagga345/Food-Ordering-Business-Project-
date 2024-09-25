import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NEXTAUTH_CONFIG } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const session = await getServerSession(NEXTAUTH_CONFIG);
  
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { email, firstName, lastName } = session.user;

  try {

    const itemIds = body.items.map((item: { itemId: number; }) => item.itemId);
    const existingItems = await prisma.menu.findMany({
      where: {
        id: { in: itemIds }
      }
    });

    if (existingItems.length !== itemIds.length) {
      return NextResponse.json({ message: "Invalid item IDs" }, { status: 400 });
    }

    const addedOrder = await prisma.orders.create({
      data: {
        description: body.description,
        houseStreet: body.houseStreet,
        landmark: body.landmark,
        city: body.city,
        pincode: body.pincode,
        payment_id: "000",
        status: "Unconfirmed",
        user: {
          connect: { email },
        },
        items: {
          create: body.items.map((item: { itemId: number; quantity: number; }) => ({
            itemId: item.itemId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true, // Include order items in the response if needed
      },
    });

    return NextResponse.json({ message: "Order added successfully", order: addedOrder });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
