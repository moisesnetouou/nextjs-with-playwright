import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (username === 'admin' && password === '123456') {
    const user = {
      name: 'admin',
      username: 'admin',
      roles: ['admin'],
    }

    return NextResponse.json({
      success: true,
      user,
    })
  }

  if (username === '' && password === '123456') {
    const user = {
      name: 'client',
      username: 'client',
      roles: ['user'],
    }

    return NextResponse.json({
      success: true,
      user,
    })
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
