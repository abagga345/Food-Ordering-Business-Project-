import { NextRequest, NextResponse } from "next/server";
import { addItem } from "@/app/lib/schemas/schema";
import prisma from "@/db";

export async function GET(req:NextRequest){
    try{
        const pending_orders = await prisma.orders.findMany({
            where: {
                status: {
                    not: 'Delivered'
                }
            },
            include:{
                items:{
                    select:{
                        quantity:true,
                        item:true
                    }
                }
            }
        });
        return NextResponse.json({"message":"Pending orders fetched successfully",orders:pending_orders});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}