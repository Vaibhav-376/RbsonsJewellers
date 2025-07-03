import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../../prisma/client"

export async function GET(){
    const categories = await prisma.category.findMany();
    return NextResponse.json({categories})
}

export async function POST(request:NextRequest){
    const data = await request.json();
    const newCategory = await prisma.category.create({
        data:{
            name:data.name,
        }
    })
    return NextResponse.json({message:"category Created Successfully",newCategory})
}