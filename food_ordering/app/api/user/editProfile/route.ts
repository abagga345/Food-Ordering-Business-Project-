import { NextRequest, NextResponse } from "next/server";
import { editUser } from "@/app/lib/schemas/schema";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NEXTAUTH_CONFIG } from "@/app/lib/auth";


export async function PUT(req:NextRequest){
    let body=await req.json();
    let typeCheck=editUser.safeParse(body);
    if  (typeCheck["success"]===false){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    if  (body.firstName===undefined && body.lastName===undefined && body.contactNo===undefined && body.password===undefined){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    let session=await getServerSession(NEXTAUTH_CONFIG);
    if (!session) {
        return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
    }
    let username=session.user.username;
    try{
       let updated_user=await prisma.users.update({
            where:{
                username:username
            },
            data:body
        });
        return NextResponse.json({"message":"Profile edited successfully"});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}