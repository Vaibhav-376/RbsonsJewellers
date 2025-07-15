import { NextRequest, NextResponse } from "next/server";
import registerSchema from "./schema"; // Zod schema
import prisma from "../../../../../prisma/client"
import bcrypt from "bcryptjs";



export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = registerSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { errors: validation.error.errors },
                { status: 400 }
            );
        }

        const { email, password, name } = body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword, // you need to add this to your model
            },
        });

        return NextResponse.json(
            { message: "User registered successfully", user },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
