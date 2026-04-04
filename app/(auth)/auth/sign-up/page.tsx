import type { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { SignUpForm } from "@/features/auth"

export const metadata: Metadata = {
  title: `Sign Up - ${appConfig.appName}`,
  description: `Create an account for ${appConfig.appNameFull}`,
}

export default function SignUpPage() {
  return <SignUpForm />
}
