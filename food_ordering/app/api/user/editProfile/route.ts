import { NextRequest, NextResponse } from "next/server";
import { signup } from "@/app/lib/schemas/schema";
import prisma from "@/db";