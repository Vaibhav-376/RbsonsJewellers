import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET); 
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}


export function getUserFromRequest(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) return null;
  const user = verifyToken(token);
  return user || null;
}


export function decodedToken(token: string) {
  try {
    return jwt.decode(token);
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}