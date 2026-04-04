import Link from "next/link"
import { headers } from "next/headers"

import { ModeToggle } from "@/components/ui/toggle-theme"
import { Button } from "@/components/ui/button"
import { appConfig } from "@/config/app.config"
import { authRoutes } from "@/features/auth/lib/auth-routes"
import { auth } from "@/lib/auth"
import { UserMenu } from "@/components/navbar/UserMenu"

export async function AppNavbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <Link href={authRoutes.home} className="font-medium">
            {appConfig.appName}
          </Link>
          {session ? (
            <nav className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" asChild>
                <Link href={authRoutes.dashboard}>Dashboard</Link>
              </Button>
            </nav>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />

          {session ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href={authRoutes.signUp}>Sign up</Link>
              </Button>
              <Button asChild>
                <Link href={authRoutes.signIn}>Sign in</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
