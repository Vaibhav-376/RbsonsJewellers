import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function GET(){
    const products = await prisma.product.findMany({
        include: {
            category: true,
            subCategory: true
        }
    })

    return NextResponse.json({products})
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, description, price, stock, imageUrl, category, subCategory } = data;

  let existingCategory = await prisma.category.findUnique({
    where: { name: category },
  });

  if (!existingCategory) {
    existingCategory = await prisma.category.create({
      data: { name: category },
    });
  }

  let existingSubCategory = await prisma.subCategory.findFirst({
    where: {
      name: subCategory,
      categoryId: existingCategory.id,
    },
  });

  if (!existingSubCategory) {
    existingSubCategory = await prisma.subCategory.create({
      data: {
        name: subCategory,
        category: {
          connect: { id: existingCategory.id },
        },
      },
    });
  }


  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      imageUrl,
      category: { connect: { id: existingCategory.id } },
      subCategory: { connect: { id: existingSubCategory.id } },
    },
  });

  return NextResponse.json(newProduct);
}

