import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [ '/sign-in', '/sign-up', '/', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
const token = await getToken({ 
  req: request,
  secret: process.env.NEXT_SECRET// Make sure this is set
});
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      
      url.pathname.startsWith('/verify') 
   )
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && url.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}