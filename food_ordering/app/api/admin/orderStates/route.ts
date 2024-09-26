import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";


export async function GET(req:NextRequest){
    try{
        let unconfirmed_count=await prisma.orders.aggregate({
            where:{
                status:"Unconfirmed",
            },
            _count:{
                id:true,
            }
        })
        let processing_count=await prisma.orders.aggregate({
            where:{
                status:'Processing',
            },
            _count:{
                id:true,
            }
        })
        let dispatched_count=await prisma.orders.aggregate({
            where:{
                status:'Dispatched',
            },
            _count:{
                id:true,
            }
        })
        let delivered_count=await prisma.orders.aggregate({
            where:{
                status:'Delivered'
            },
            _count:{
                id:true
            }
        })
        let rejected_count=await prisma.orders.aggregate({
            where:{
                status:'Rejected'
            },
            _count:{
                id:true
            }
        })
        return NextResponse.json({
            "message":"Order states count fetched successfully",
            delivered:delivered_count["_count"]["id"],
            rejected:rejected_count["_count"]["id"],
            processing:processing_count["_count"]["id"],
            unconfirmed:unconfirmed_count["_count"]["id"],
            dispatched:dispatched_count["_count"]["id"]
        })

    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}