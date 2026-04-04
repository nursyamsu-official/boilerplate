import type { Metadata } from "next"

import { SignInForm } from "@/features/auth"
import { appConfig } from "@/config/app.config"

export const metadata: Metadata = {
  title: `Sign In - ${appConfig.appName}`,
  description: `Sign in to ${appConfig.appNameFull}`,
}

export default function SignInPage() {
  return <SignInForm />
}
