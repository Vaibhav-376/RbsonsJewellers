import {  NextResponse } from "next/server";

export function POST() {
    const response = NextResponse.json({ message: "logout Successfully" })
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response
}