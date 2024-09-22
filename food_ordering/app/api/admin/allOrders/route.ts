import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req:NextRequest){
    let temp=req.nextUrl.searchParams.get("pageNo");
    if (temp===null){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    let pageNo=parseInt(temp);
    try{
        let result=await prisma.orders.findMany({
            skip:(pageNo-1)*20,
            take:20,
            orderBy:{
                timestamp:"desc"
            }
        });
        return NextResponse.json({"message":"Orders fetched successfully",orders:result});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}