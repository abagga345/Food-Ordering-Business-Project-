import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req:NextRequest){
    try{
        let result=await prisma.orders.findMany({
            orderBy:{
                timestamp:"desc"
            },
            include:{
                items:{
                    select:{
                        quantity:true,
                        item:true
                    }
                }
            }
        });
        return NextResponse.json({"message":"Orders fetched successfully",orders:result});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}