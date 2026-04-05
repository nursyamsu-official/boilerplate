import { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { AuthCard, AuthPageContainer, SignInForm } from "@/features/auth"

export const metadata: Metadata = {
  title: `Sign In - ${appConfig.appName}`,
  description: `Sign In | ${appConfig.description}`,
}

export default function SignInPage() {
  return (
    <AuthPageContainer>
      <AuthCard title="Sign In" description="Sign in to access your dashboard.">
        <SignInForm />
      </AuthCard>
    </AuthPageContainer>
  )
}
