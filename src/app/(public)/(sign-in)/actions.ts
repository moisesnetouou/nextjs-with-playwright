'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signIn(_: { error?: string }, formData: FormData) {
  const username = formData.get('username')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  const host = (await headers()).get('host')
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

  const apiUrl = `${protocol}://${host}/api/auth`

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  const result = await response.json()

  if (result.success) {
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
