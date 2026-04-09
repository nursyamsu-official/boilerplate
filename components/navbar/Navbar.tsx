"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { appConfig } from "@/config/app.config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserMenu } from "./UserMenu";
import { Menu, LayoutDashboard, KeyRound, LogOut } from "lucide-react";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/contact-us", label: "Contact" },
];

export function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthenticated = !!session?.user;

  const handleSignOut = async () => {
    setMobileOpen(false);
    await signOut();
    router.push("/auth/sign-in");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4">
        <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
          <span className="font-heading text-sm font-semibold">{appConfig.appName}</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {!isAuthenticated &&
            publicLinks.map((link) => (
              <Button key={link.href} variant="ghost" size="default" asChild>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
        </nav>

        {/* Desktop auth actions */}
        <div className="hidden items-center gap-2 md:flex">
          {isPending ? (
            <div className="h-6 w-16 animate-pulse rounded bg-muted" />
          ) : isAuthenticated ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Button variant="ghost" size="default" asChild>
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
              <Button size="default" asChild>
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>{appConfig.appName}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-2 pt-4">
                {!isAuthenticated &&
                  publicLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      size="lg"
                      className="justify-start"
                      asChild
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  ))}

                {isAuthenticated && (
                  <>
                    <div className="mb-2 border-b px-2 pb-2">
                      <p className="text-xs font-medium">{session.user.name}</p>
                      <p className="text-[0.625rem] text-muted-foreground">{session.user.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="justify-start"
                      onClick={() => {
                        setMobileOpen(false);
                        router.push("/dashboard");
                      }}
                    >
                      <LayoutDashboard />
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="justify-start"
                      onClick={() => {
                        setMobileOpen(false);
                        router.push("/settings/change-password");
                      }}
                    >
                      <KeyRound />
                      Change Password
                    </Button>
                    <div className="my-1 border-b" />
                    <Button
                      variant="ghost"
                      size="lg"
                      className="justify-start text-destructive"
                      onClick={handleSignOut}
                    >
                      <LogOut />
                      Sign Out
                    </Button>
                  </>
                )}

                {!isAuthenticated && (
                  <div className="mt-2 flex flex-col gap-1">
                    <Button
                      size="lg"
                      className="w-full"
                      asChild
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href="/auth/sign-up">Sign Up</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      asChild
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href="/auth/sign-in">Sign In</Link>
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
