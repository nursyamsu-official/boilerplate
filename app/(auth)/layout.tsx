import { redirect } from "next/navigation"

import { getServerSession } from "@/features/auth"

type AuthLayoutProps = {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getServerSession()

  if (session) {
    redirect("/dashboard")
  }

  return children
}
