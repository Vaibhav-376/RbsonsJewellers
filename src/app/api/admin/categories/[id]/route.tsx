import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/client";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const data = await request.json();
    const updatedCategory = await prisma.category.update({
        where: { id: Number(params.id) },
        data
    })
    return NextResponse.json({ message: "Category Updated Successfully", updatedCategory })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const deletedCategory = await prisma.category.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ message: "Category Deleted Successfully", deletedCategory })
}