import { NextRequest, NextResponse } from "next/server";
import { signin } from "@/app/lib/schemas/schema";
import prisma from "@/db";
import bcrypt from "bcrypt";

export async function POST(req:NextRequest){
    let body =await req.json();
    let runtimeType= signin.safeParse(body);
    if (runtimeType["success"]===false){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    try{
        let search=await prisma.users.findFirst({where:{email:body.email},select:{role:true,email:true,password: true}});
         
        if (search===null){
            return NextResponse.json({"message":"Unauthorised"},{status:401});
        }
        const match = await bcrypt.compare(body.password,search.password);
        if (!match) {
            return NextResponse.json({msg : "Invalid Password"},{status:401});
        }
        return NextResponse.json({"message":"Authentication successful",email:search["email"],role:search["role"]})
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}