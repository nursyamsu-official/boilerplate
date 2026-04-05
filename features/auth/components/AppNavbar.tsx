"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { MenuIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/sonner"
import { signOut, useSession } from "@/lib/auth-client"

function getInitials(name?: string | null) {
  if (!name) {
    return "U"
  }

  const chunks = name.split(" ").filter(Boolean)

  return chunks
    .slice(0, 2)
    .map((chunk) => chunk[0])
    .join("")
    .toUpperCase()
}

export function AppNavbar() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const isAuthenticated = !!session

  const handleSignOut = async () => {
    await toast.promise(
      (async () => {
        const result = await signOut()

        if (result.error) {
          throw new Error("Failed to sign out")
        }

        router.push("/sign-in")
        router.refresh()
      })(),
      {
        loading: "Signing out...",
        success: "Saved successfully",
        error: "Failed to save",
      }
    )
  }

  return (
    <header className="border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link className="text-sm font-semibold" href="/">
            SALAM AlBayyinah
          </Link>
          <nav className="hidden items-center gap-3 md:flex">
            <Link className="text-xs text-muted-foreground hover:text-foreground" href="/">
              Home
            </Link>
            <Link
              className="text-xs text-muted-foreground hover:text-foreground"
              href="/contact-us"
            >
              Contact
            </Link>
            {isAuthenticated && (
              <Link
                className="text-xs text-muted-foreground hover:text-foreground"
                href="/dashboard"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {!isAuthenticated ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto gap-2 px-2 py-1">
                  <Avatar size="sm">
                    <AvatarImage src={session.user.image ?? undefined} />
                    <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
                  </Avatar>
                  <span className="max-w-[140px] truncate text-xs font-medium">
                    {session.user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings/security/change-password">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    void handleSignOut()
                  }}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Manage your account and navigation links.</SheetDescription>
            </SheetHeader>
            <div className="space-y-2 px-6 pb-6">
              <SheetClose asChild>
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/">Home</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/contact-us">Contact</Link>
                </Button>
              </SheetClose>

              {isAuthenticated ? (
                <>
                  <SheetClose asChild>
                    <Button asChild className="w-full justify-start" variant="ghost">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild className="w-full justify-start" variant="ghost">
                      <Link href="/dashboard/settings/security/change-password">
                        Settings
                      </Link>
                    </Button>
                  </SheetClose>
                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={() => {
                      setIsOpen(false)
                      void handleSignOut()
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button asChild className="w-full justify-start" variant="ghost">
                      <Link href="/sign-in">Sign In</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild className="w-full justify-start">
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </SheetClose>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
