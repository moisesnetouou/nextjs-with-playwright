import { SignInForm } from './sign-in-form'

export default function SignIn() {
  return (
    <main className="flex h-svh items-center justify-center">
      <section className="w-[400px] rounded-xl bg-slate-200 p-4">
        <SignInForm />
      </section>
    </main>
  )
}
