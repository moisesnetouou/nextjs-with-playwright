import type { NextResponse } from 'next/server'

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set('@test-project:user', '', { maxAge: 0 })
}
