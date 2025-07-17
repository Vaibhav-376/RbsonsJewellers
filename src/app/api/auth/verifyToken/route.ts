import { NextRequest, NextResponse } from 'next/server';
import { decodedToken, verifyToken } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = decodedToken(token);
  return NextResponse.json({ message: "Authorized", user }, { status: 200 });
}
