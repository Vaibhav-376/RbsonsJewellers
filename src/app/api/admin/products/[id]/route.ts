import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";
import { getUserFromRequest } from '@/lib/jwt';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const user = getUserFromRequest(request);
  if (!user || !user.is_admin) {
    return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
  }

  const data = await request.json();

  const { name, description, price, stock, categoryId, subCategoryId } = data;

  const updatedProduct = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      name,
      description,
      price,
      stock,
      categoryId,
      subCategoryId,
    },
  });

  return NextResponse.json(updatedProduct);
}


export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      category: true,
      subCategory: true,
      images: true,
    },
  });
  return NextResponse.json(product);
}


export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const user = getUserFromRequest(request);
  if (!user || !user.is_admin) {
    return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 403 });
  }
  const { id } = await context.params;

  const deletedProduct = await prisma.product.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({
    message: "Product deleted",
    deletedProduct,
  });
}
