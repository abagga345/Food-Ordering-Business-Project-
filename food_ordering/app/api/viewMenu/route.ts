import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
export async function GET(req:NextRequest){
    try{
        let availableItems=await prisma.menu.findMany({
            where:{
                visibility:true,
                available:true
            }
        });
        
        return NextResponse.json({"message":"Menu Fetched Successully",items:availableItems});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}
