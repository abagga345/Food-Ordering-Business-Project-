import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
export async function GET(req:NextRequest){
    const id=req.nextUrl.searchParams.get("id");
    if (id===null){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    const itemId=parseInt(id);
    try{
        let availableItem=await prisma.menu.findFirst({
            where:{
                id:itemId
            },
            select:{
                id:true,
                amount:true,
                title:true,
                imageUrl:true,
                visibility:true,
                available:true,
            }
        });
        if (availableItem===null){
            return NextResponse.json({"message":"Item not found"},{status:400});
        }
        return NextResponse.json({
            "message":"Menu Item Fetched Successully",
            id:availableItem["id"],
            title:availableItem["title"],
            imageUrl:availableItem["imageUrl"],
            amount:availableItem["amount"],
            visibility:availableItem["visibility"]&&availableItem["available"]
        });
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}
