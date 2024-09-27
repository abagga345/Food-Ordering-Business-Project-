import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function PUT(req:NextRequest){
    const id=req.nextUrl.searchParams.get("id");
    if (id===null){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    const itemId=parseInt(id);
    try{
        let updated_item=await prisma.menu.update({
            where:{
                id:itemId,
            },
            data : {
                available:false,
                visibility:false
            }
        })
        return NextResponse.json({"message":"Menu Item deleted successfully"});
    }catch(err){
        console.log(err);
        return NextResponse.json({"mesage":"Internal Server Error"},{status:500});
    }
}