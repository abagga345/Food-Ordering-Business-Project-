import { NextRequest, NextResponse } from "next/server";
import { status } from "@/app/lib/schemas/schema";
import prisma from "@/db";

export async function PUT(req:NextRequest){
    let body=await req.json();
    let typeCheck=status.safeParse(body);
    if (typeCheck["success"]===false){
        return NextResponse.json({"message":"Invalid Inputs"},{status:400});
    }
    try{
        let currentOrder = await prisma.orders.findUnique({
            where:{
                id:body.orderId
            },
            select:{
                status:true,amount:true,timestamp:true
            },
        })
        if (currentOrder===null) {
            return NextResponse.json({"message":"Order not found"},{status:404});
        }
        const previousState = currentOrder.status;
        const currentAmount=currentOrder.amount;
        const year = currentOrder.timestamp.getFullYear();
        const month=currentOrder.timestamp.getMonth()+1;
        let updatedStatus=await prisma.orders.update({
            where:{
                id:body.orderId
            },
            data:{
                status:body.status
            }
        });

        if (body.status==="Delivered" && previousState!=="Delivered") {
            await prisma.monthlySales.upsert({
                where: { year_month: { year, month } },
                create: {
                  year: year,
                  month: month,
                  totalSales: currentAmount,
                },
                update: {
                  totalSales: { increment: currentAmount },
                },
              });
        }

        if (body.status !== "Delivered" && previousState === "Delivered") {
            await prisma.monthlySales.update({
              where: { year_month: { year, month } },
              data: { totalSales: { decrement: currentAmount } },
            });
          }

        return NextResponse.json({"message":"Status updated Successfully"});
    }catch(err){
        console.log(err);
        return NextResponse.json({"message":"Internal Server Error"},{status:500});
    }
}