import { NextRequest, NextResponse } from "next/server";
import { checkout } from "@/app/lib/schemas/schema";
import prisma from "@/db";