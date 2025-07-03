import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/client";


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const data = await request.json();
    const updatedProduct = await prisma.product.update({
        where: { id: Number(params.id) },
        data,
    });
    return NextResponse.json(updatedProduct);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const deletedProduct = await prisma.product.delete({ where: { id: Number(params.id) } });
    return NextResponse.json({ message: "Product deleted" , deletedProduct});
}
