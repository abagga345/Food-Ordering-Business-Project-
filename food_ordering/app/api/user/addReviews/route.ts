import { NextRequest, NextResponse } from "next/server";
import { review } from "@/app/lib/schemas/schema";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NEXTAUTH_CONFIG } from "@/app/lib/auth";

export async function POST(req:NextRequest){
    let body=await req.json();
    let typeCheck=review.safeParse(body);
    if (typeCheck["success"]==false){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    const session=await getServerSession(NEXTAUTH_CONFIG);
    let email=session.user.email;
    let firstName = session.user.firstName;
    let lastName = session.user.lastName;
    try{
        let added_review=await prisma.reviews.create({
            data:{
                rating:body.rating,
                description:body.description,
                email:email,
                firstName : firstName,
                lastName : lastName
            }
        })
        return NextResponse.json({"message":"Review added Successfully"});
    }catch(err){
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}