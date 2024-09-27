import { NEXTAUTH_CONFIG } from "@/app/lib/auth";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const session=await getServerSession(NEXTAUTH_CONFIG);
    try{
        let details=await prisma.users.findFirst({
            where:{
                email:session.user.email
            },
            select:{
                firstName:true,
                lastName:true,
                contactNo:true
            }
        })
        if (details===null){
            return NextResponse.redirect("/login");
        }
        return NextResponse.json({
            "message":"Profile details fetched successfully",
            firstName:details.firstName,
            lastName:details.lastName,
            contactNo:details.contactNo,
            email:session.user.email
        })
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}