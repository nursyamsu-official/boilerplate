import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { authRoutes } from "@/features/auth/lib/auth-routes"
import { auth } from "@/lib/auth"

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect(authRoutes.signIn)
  }

  return <div className="mx-auto w-full max-w-6xl px-4 py-8">{children}</div>
}
