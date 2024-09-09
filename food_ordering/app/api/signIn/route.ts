import { NextRequest, NextResponse } from "next/server";
import { signin } from "@/app/lib/schemas/schema";
import prisma from "@/db";

export async function POST(req:NextRequest){
    let body =await req.json();
    let runtimeType= signin.safeParse(body);
    if (runtimeType["success"]===false){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    try{
        let search=await prisma.users.findFirst({where:{username:body.username,password:body.password},select:{role:true,username:true}});
        if (search===null){
            return NextResponse.json({"message":"Unauthorised"},{status:401});
        }
        return NextResponse.json({"message":"Authentication successful",username:search["username"],role:search["role"]})
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}