import { NextRequest, NextResponse } from "next/server";
import { status } from "@/app/lib/schemas/schema";
import prisma from "@/db";

export async function PUT(req:NextRequest){
    let body=await req.json();
    let typeCheck=status.safeParse(body);
    if (typeCheck["success"]===false){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    try{
        let updatedStatus=await prisma.orders.update({
            where:{
                id:body.orderId
            },
            data:{
                status:body.status
            }
        });
        return NextResponse.json({"message":"Status updated Successfully"});
    }catch(err){
        console.log(err);
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}