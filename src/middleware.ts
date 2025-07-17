import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;

    const res = await fetch(`${origin}/api/auth/verifyToken`, {
      method: 'GET',
      headers: {
        Cookie: `token=${token}`, 
      },
    });

    const data = await res.json();

    if (res.status === 401 ) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
    if(!data?.user?.is_admin){
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
