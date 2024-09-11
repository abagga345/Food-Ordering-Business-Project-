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
                id:body.id
            },
            data:{
                status:body.status
            }
        });
        return NextResponse.json({"message":"Visibility updated Successfully"});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}