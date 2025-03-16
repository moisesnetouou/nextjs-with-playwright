'use client'

import { useActionState } from 'react'
import { signIn } from './actions'

export function SignInForm() {
  const [state, formAction] = useActionState(signIn, { error: '' })

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="rounded bg-white p-2 text-slate-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="rounded bg-white p-2 text-slate-500"
      />

      {state.error && <p className="text-red-500">{state.error}</p>}

      <button
        type="submit"
        className="cursor-pointer rounded bg-slate-500 p-2 text-white"
      >
        Sign In
      </button>
    </form>
  )
}
