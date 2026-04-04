import type { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { ForgotPasswordForm } from "@/features/auth"

export const metadata: Metadata = {
  title: `Forgot Password - ${appConfig.appName}`,
  description: `Reset your password for ${appConfig.appNameFull}`,
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
