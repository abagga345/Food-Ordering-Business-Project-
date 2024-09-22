import { NextRequest, NextResponse } from "next/server";
import { addItem } from "@/app/lib/schemas/schema";
import prisma from "@/db";

export async function POST(req:NextRequest){
    let body=await req.json();
    let typeCheck=addItem.safeParse(body);
    if (typeCheck["success"]===false){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    try{
        let added_item=await prisma.menu.create({
            data:{
                imageUrl:body.imageUrl,
                description:body.description,
                amount:body.amount,
                title:body.title
            }
        });
        return NextResponse.json({"message":"Item added successfully","itemId":added_item.id});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}