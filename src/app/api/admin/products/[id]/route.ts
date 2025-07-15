import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const data = await request.json();

  const updatedProduct = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });

  return NextResponse.json(updatedProduct);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const deletedProduct = await prisma.product.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({
    message: "Product deleted",
    deletedProduct,
  });
}
