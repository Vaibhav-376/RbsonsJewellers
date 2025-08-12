import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../../prisma/client"
import { getUserFromRequest } from '@/lib/jwt';

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json({ categories })
}

function generateslug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/[^a-z0-9-]/g, ""); // remove special chars
}

export async function POST(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user || !user.is_admin) {
    return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 403 });
  }
  const body = await request.json();
  const { categoryName, subCategoryName } = body;


  const categoryslug = generateslug(categoryName);
  const subCategoryslug = generateslug(subCategoryName);

  try {
    let category = await prisma.category.findFirst({
      where: {
        name: {
          equals: categoryName,
          mode: "insensitive",
        },
      },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryName,
          slug: categoryslug
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
        slug: subCategoryslug
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