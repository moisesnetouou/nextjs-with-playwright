'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signIn(_: { error?: string }, formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')

  if (username === 'admin' && password === '123456') {
    const cookieStore = await cookies()

    cookieStore.set('@test-project:user', JSON.stringify({ username }), {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    redirect('/dashboard')
  }

  return { error: 'Usuário ou senha inválidos' }
}
