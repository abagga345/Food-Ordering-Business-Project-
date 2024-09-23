import { NextRequest, NextResponse } from "next/server";
import { addItem } from "@/app/lib/schemas/schema";
import prisma from "@/db";

export async function GET(req:NextRequest){
    try{
        let result=await prisma.menu.findMany({
            orderBy:{
                creationDate:"desc"
            }
        });
        return NextResponse.json({"message":"Items fetched successfully",items:result});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}