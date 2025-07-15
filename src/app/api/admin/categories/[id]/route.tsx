import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const data = await request.json();

  const updatedCategory = await prisma.category.update({
    where: { id: Number(id) },
    data,
  });

  return NextResponse.json({
    message: "Category Updated Successfully",
    updatedCategory,
  });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const deletedCategory = await prisma.category.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({
    message: "Category Deleted Successfully",
    deletedCategory,
  });
}
