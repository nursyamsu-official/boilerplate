import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const AUTH_PATHS_EXEMPT_FROM_REDIRECT = new Set<string>([
  "/auth/reset-password",
  "/auth/reset-password/success",
  "/auth/verify-email",
  "/auth/verify-success",
  "/auth/change-email/verify",
]);

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");
  const isExemptAuthRoute = AUTH_PATHS_EXEMPT_FROM_REDIRECT.has(pathname);

  if (sessionCookie && isAuthRoute && !isExemptAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!sessionCookie && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
