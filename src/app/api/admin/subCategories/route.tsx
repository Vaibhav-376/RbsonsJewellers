import { prisma } from "../../../../../prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const subCategories = await prisma.subCategory.findMany();
  return NextResponse.json({ subCategories });
}
