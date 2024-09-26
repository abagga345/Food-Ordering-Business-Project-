import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";


export async function GET(req:NextRequest){
    try{
        let total_sales=await prisma.orders.aggregate({
            where:{
                status:'Delivered'
            },
            _sum:{
                amount:true
            }
        })
        let avg_reviews=await prisma.reviews.aggregate({
            _avg:{
                rating:true
            }
        })
        
        return NextResponse.json({
            "message":"Total sales and average review fetched successfully",
            totalSales:total_sales["_sum"]["amount"],
            avgReview:avg_reviews["_avg"]["rating"]
        })

    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}