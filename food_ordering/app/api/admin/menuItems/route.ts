import { NextRequest, NextResponse } from "next/server";
import { addItem } from "@/app/lib/schemas/schema";
import prisma from "@/db";

export async function GET(req:NextRequest){
    let temp=req.nextUrl.searchParams.get("pageNo");
    if (temp===null){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    let pageNo=parseInt(temp);
    try{
        let result=await prisma.menu.findMany({
            skip:(pageNo-1)*20,
            take:20,
            orderBy:{
                creationDate:"desc"
            }
        });
        return NextResponse.json({"message":"Items fetched successfully",items:result});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}