import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

// Correct type signature
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
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
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const deletedCategory = await prisma.category.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({
    message: "Category Deleted Successfully",
    deletedCategory,
  });
}
