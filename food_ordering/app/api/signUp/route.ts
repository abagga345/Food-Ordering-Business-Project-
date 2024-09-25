import { NextRequest, NextResponse } from "next/server";
import { signup } from "@/app/lib/schemas/schema";
import prisma from "@/db";
import bcrypt from "bcrypt";

export async function  POST(req:NextRequest){
    let body=await req.json();
    let runtimeType=signup.safeParse(body);
    if (runtimeType["success"]===false){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    try{
        let exists=await prisma.users.findFirst({
            where:{
                email:body.email
            }
        });
        if (exists!==null){
            return NextResponse.json({"message":"User Already Exists"},{status:400});
        }
        const hashed = await bcrypt.hash(body.password,5);
        let added_user=await prisma.users.create(
            {
                data:{
                    firstName:body.firstName,
                    lastName:body.lastName,
                    contactNo:body.contactNo,
                    email:body.email,
                    password:hashed
                }
        })
        return NextResponse.json({"message":"SignUp successful"});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}