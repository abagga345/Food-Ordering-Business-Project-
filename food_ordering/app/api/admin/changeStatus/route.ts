import { NextRequest, NextResponse } from "next/server";
import { addItem } from "@/app/lib/schemas/schema";
import prisma from "@/db";