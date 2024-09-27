import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req:NextRequest){
    const id=req.nextUrl.searchParams.get("id");
    if (id===null){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    const orderId=parseInt(id);
    try{
        let order_details=await prisma.orders.findFirst({
            where:{
                id:orderId
            },
            include:{
                items:{
                    select:{
                        quantity:true,
                        item:true
                    }
                }
            }
        })
        if (order_details===null){
            return NextResponse.json({"message":"No order found"},{status:400});
        }
        return NextResponse.json({
            "message":"Order Items fetched Successfully",
            "items":order_details["items"]
        });
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}