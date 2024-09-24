import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NEXTAUTH_CONFIG } from "@/app/lib/auth";

export async function GET(req:NextRequest){
    let session=await getServerSession(NEXTAUTH_CONFIG);
    let email=session.email;
    try{
        let myOrders=await prisma.orders.findMany({
            where:{
                email:email
            },
            include:{
                items:{
                    select:{
                        quantity:true,itemId:true
                    }
                }
            }
        })
        return NextResponse.json({"message":"All orders fetched",orders:myOrders});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}