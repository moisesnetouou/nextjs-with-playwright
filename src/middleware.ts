import { type NextRequest, NextResponse } from 'next/server'

import { publicRoutes } from '@/lib/auth/routes'
import { clearAuthCookies } from '@/lib/auth/utils'

import { REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE } from './lib/auth/constants'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const publicRoute = publicRoutes.find(route => route.path.test(path))

  const user = request.cookies.get('@test-project:user')?.value

  const isAuthenticated = !!user

  if (!isAuthenticated) {
    if (publicRoute) return NextResponse.next()

    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    const response = NextResponse.redirect(redirectUrl)
    clearAuthCookies(response)
    return response
  }

  if (publicRoute?.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
