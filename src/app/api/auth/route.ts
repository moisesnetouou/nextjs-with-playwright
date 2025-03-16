import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (username === 'admin' && password === '123456') {
    const response = NextResponse.json({ success: true })

    response.cookies.set('@test-project:user', JSON.stringify({ username }), {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
