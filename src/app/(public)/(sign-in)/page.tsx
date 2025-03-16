import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignInForm } from './sign-in-form'

export default async function SignIn() {
  const cookieStore = await cookies()

  if (cookieStore.has('@test-project:user')) {
    redirect('/dashboard')
  }

  return (
    <main className="flex h-svh items-center justify-center">
      <section className="w-[400px] rounded-xl bg-slate-200 p-4">
        <SignInForm />
      </section>
    </main>
  )
}
