import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function DELETE(req:NextRequest){
    const id=req.nextUrl.searchParams.get("id");
    if (id===null){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    const reviewId=parseInt(id);
    try{
        let deleted_review=await prisma.reviews.delete({
            where:{
                id:reviewId
            }
        })
        return NextResponse.json({"message":"Review Deleted Successfully"});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}