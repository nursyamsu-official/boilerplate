import { redirect } from "next/navigation"

import { getServerSession } from "@/features/auth"

type ProtectedLayoutProps = {
  children: React.ReactNode
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const session = await getServerSession()

  if (!session) {
    redirect("/sign-in")
  }

  return children
}
