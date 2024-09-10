import { NextRequest, NextResponse } from "next/server";
import { paymentId } from "@/app/lib/schemas/schema";
import prisma from "@/db";

export async function PUT(req:NextRequest){
    let body=await req.json();
    let typeCheck=paymentId.safeParse(body);
    if (typeCheck["success"]==false){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    try{
        let payment_logged=await prisma.orders.update({
            where:{
                id:body.id
            },
            data:{
                payment_id:body.payment_id,
                status:'Processing'
            }
        })
        return NextResponse.json({"message":"Payment Id added Successfully"});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}