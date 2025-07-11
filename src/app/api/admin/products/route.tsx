import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      subCategory: true,
      images: true, 
    },
  });

  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      name,
      description,
      price,
      stock,
      category,
      subCategory,
      imagePublicIds = [],
    } = data;


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
        categoryId: existingCategory.id,
        subCategoryId: existingSubCategory.id,
        images: {
          create: imagePublicIds.map((id: string) => ({ url: id })),
        },
      },
      include: {
        category: true,
        subCategory: true,
        images: true,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
