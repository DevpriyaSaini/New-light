import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXT_SECRET 
  });

  const { pathname } = request.nextUrl;
  if (!token && (
    pathname.startsWith('/sign-in') || 
    pathname.startsWith('/sign-up')
    
  )) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/' 
  ]
}