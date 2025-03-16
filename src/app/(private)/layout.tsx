import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()

  if (!cookieStore.has('@test-project:user')) {
    redirect('/')
  }

  return <div>{children}</div>
}
