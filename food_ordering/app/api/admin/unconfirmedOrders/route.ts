import { NextRequest, NextResponse } from "next/server";
import { addItem } from "@/app/lib/schemas/schema";
import prisma from "@/db";

export async function GET(req:NextRequest){
    try{
        let unconfirmed_items=await prisma.orders.

    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}