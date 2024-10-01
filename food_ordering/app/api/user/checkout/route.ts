import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NEXTAUTH_CONFIG } from "@/app/lib/auth";
import { checkout } from "@/app/lib/schemas/schema";
import { paymentMethods } from "@prisma/client";


export async function POST(req: NextRequest) {
  const body = await req.json();
  let runtimeType=checkout.safeParse(body);
  if (runtimeType["success"]===false){
      return NextResponse.json({"message":"Invalid Inputs"},{status:400});
  }
  const session = await getServerSession(NEXTAUTH_CONFIG);
  
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { email, firstName, lastName } = session.user;

  try {
    const itemIds = body.items.map((item: { itemId: number }) => item.itemId);
    const OutofStockItems= [];
    let deleted= false;
    const existingItems = await prisma.menu.findMany({
      where: {
        id: { in: itemIds }
      },
    });

    if (existingItems.length !== itemIds.length) {
      return NextResponse.json({ message: "Invalid item IDs" }, { status: 400 });
    }

    let calculatedAmount = 0;
    const shipping=parseInt(process.env.NEXT_PUBLIC_SHIPPING_COST as string);
    const codcharges=parseInt(process.env.NEXT_PUBLIC_COD as string);
    const taxrate = parseInt(process.env.NEXT_PUBLIC_TAX_RATE as string);
    for (const item of body.items) {
      const menuItem = existingItems.find(menuItem => menuItem.id === item.itemId);
      if (!menuItem || menuItem.available===false) {
          deleted=true;
          break;
      }
      if (menuItem.visibility===false) {
          OutofStockItems.push(item.itemId);
          continue;
      }
    

      calculatedAmount += menuItem.amount * item.quantity;
    }
    calculatedAmount += shipping + (body.paymentMethod === "COD" ? codcharges : 0);
    const tax = calculatedAmount*taxrate/100;
    const totalAmount = Math.round(calculatedAmount+tax);


    if (deleted===true) {
      return NextResponse.json({message : "Some items have been deleted"},{status:400});
    }
    
    if (OutofStockItems.length>0) {
      return NextResponse.json({ message: "Some Items are Out of Stock" , Items:OutofStockItems}, { status: 400 });
    }
    if (totalAmount !== body.amount) {
      return NextResponse.json({ message: "Incorrect Amount" }, { status: 400 });
    }

    const addedOrder = await prisma.orders.create({
      data: {
        description: body.description,
        houseStreet: body.houseStreet,
        landmark: body.landmark,
        state: body.state,
        pincode: body.pincode,
        payment_id: "000",
        status: "Unconfirmed",
        user: {
          connect: { email },
        },
        items: {
          create: body.items.map((item: { itemId: number; quantity: number }) => ({
            itemId: item.itemId,
            quantity: item.quantity,
          })),
        },
        amount: body.amount,
        paymentMethod : body.paymentMethod,
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ message: "Order Created successfully", id: addedOrder.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
