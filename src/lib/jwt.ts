import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

interface TokenPayload {
  id: number;
  email: string;
  is_admin: boolean;
}


export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'object' && 'is_admin' in decoded) {
      return decoded as TokenPayload;
    }
    return null;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}


export function getUserFromRequest(request: NextRequest): TokenPayload | null {
  const token = request.cookies.get('token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function decodedToken(token: string) {
  try {
    return jwt.decode(token);
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}