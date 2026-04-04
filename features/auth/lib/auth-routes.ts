export const authRoutes = {
  home: "/",
  dashboard: "/dashboard",
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  security: "/dashboard/account/security",
} as const

export function buildAbsoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL ??
        process.env.BETTER_AUTH_URL ??
        "http://localhost:3000"

  return new URL(path, baseUrl).toString()
}
