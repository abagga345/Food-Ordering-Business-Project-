import { NextRequest, NextResponse } from "next/server";
import { review } from "@/app/lib/schemas/schema";
import prisma from "@/db";

export async function POST(req:NextRequest){
    let body=await req.json();
    let typeCheck=review.safeParse(body);
    if (typeCheck["success"]==false){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    try{
        
        
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}