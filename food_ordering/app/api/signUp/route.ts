import { NextRequest, NextResponse } from "next/server";
import { signup } from "@/app/lib/schemas/schema";
import prisma from "@/db";

export async function  POST(req:NextRequest){
    let body=await req.json();
    let runtimeType=signup.safeParse(body);
    if (runtimeType["success"]===false){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    try{
        let exists=await prisma.users.findFirst({
            where:{
                username:body.username
            }
        });
        if (exists!==null){
            return NextResponse.json({"message":"User Already Exists"},{status:400});
        }
        let added_user=await prisma.users.create(
            {
                data:{
                    firstName:body.firstName,
                    lastName:body.lastName,
                    contactNo:body.contactNo,
                    emailId:body.emailId,
                    username:body.username,
                    password:body.password
                }
        })
        return NextResponse.json({"message":"SignUp successful"});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}