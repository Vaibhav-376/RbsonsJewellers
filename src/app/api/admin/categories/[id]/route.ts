import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../../prisma/client';

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');  // or from JSON body
  const data = await request.json();

  const updatedCategory = await prisma.category.update({
    where: { id: Number(id) },
    data,
  });

  return NextResponse.json({
    message: 'Category Updated Successfully',
    updatedCategory,
  });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')!;
  
  const deletedCategory = await prisma.category.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({
    message: 'Category Deleted Successfully',
    deletedCategory,
  });
}
