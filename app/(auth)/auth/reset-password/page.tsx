import type { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { ResetPasswordForm } from "@/features/auth"

export const metadata: Metadata = {
  title: `Reset Password - ${appConfig.appName}`,
  description: `Choose a new password for ${appConfig.appNameFull}`,
}

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{
    token?: string
  }>
}) {
  const { token } = await searchParams

  return <ResetPasswordForm token={token} />
}
