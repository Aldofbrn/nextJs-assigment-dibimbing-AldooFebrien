import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  if (token) {
    NextResponse.next();
  } else {
    return NextResponse.rewrite(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/', '/productlist'],
};
