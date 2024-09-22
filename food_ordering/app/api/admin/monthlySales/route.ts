import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req:NextRequest){
    const dateobj=new Date();
    let currentYear=dateobj.getFullYear();
    let currentMonth=dateobj.getMonth(); 
    let currentDay=dateobj.getDate();
    try{

    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}