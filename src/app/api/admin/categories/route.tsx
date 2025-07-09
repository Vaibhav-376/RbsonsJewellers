import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../../prisma/client"

export async function GET(){
    const categories = await prisma.category.findMany();
    return NextResponse.json({categories})
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { categoryName, subCategoryName } = body;

  try {
    let category = await prisma.category.findUnique({
      where: {
        name: categoryName,
      },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryName,
        },
      });
    }

    const existingSubCategory = await prisma.subCategory.findFirst({
      where: {
        name: subCategoryName,
        categoryId: category.id,
      },
    });

    if (existingSubCategory) {
      return NextResponse.json({
        message: "Subcategory already exists under this category.",
        category,
      });
    }

    const subCategory = await prisma.subCategory.create({
      data: {
        name: subCategoryName,
        categoryId: category.id,
      },
    });

    return NextResponse.json({
      message: "Category and Subcategory saved successfully.",
      category,
      subCategory,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}