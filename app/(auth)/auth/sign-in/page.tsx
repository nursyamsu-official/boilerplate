import type { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { SignInForm } from "@/features/auth"

export const metadata: Metadata = {
  title: `Sign In - ${appConfig.appName}`,
  description: `Sign in to ${appConfig.appNameFull}`,
}

export default function SignInPage() {
  return <SignInForm />
}
