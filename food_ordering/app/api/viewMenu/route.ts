import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
export async function GET(req:NextRequest){
    let temp=req.nextUrl.searchParams.get("pageNo");
    if (temp===null){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    let pageNo=parseInt(temp);
    try{
        let availableItems=await prisma.menu.findMany({
            where:{
                visibility:true
            },
            skip:(pageNo-1)*20,
            take:20
        });
        return NextResponse.json({"message":"Menu Fetched Successully",items:availableItems});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}
