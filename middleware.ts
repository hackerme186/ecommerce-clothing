import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.has('sb-access-token')
  if (
    ['/product/create', '/product/edit'].some((p) =>
      req.nextUrl.pathname.startsWith(p),
    ) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/product/create', '/product/edit/:path*'],
}
