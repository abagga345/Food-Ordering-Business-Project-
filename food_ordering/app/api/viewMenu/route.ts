import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
export async function GET(req:NextRequest){
    try{
        let availableItems=prisma.menu.findMany({
            where:{
                visibility:true
            }
        });
        return NextResponse.json({"message":"Menu Fetched Successully",items:availableItems});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}