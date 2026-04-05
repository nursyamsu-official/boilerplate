import { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { AuthCard, AuthPageContainer, SignUpForm } from "@/features/auth"

export const metadata: Metadata = {
  title: `Sign Up - ${appConfig.appName}`,
  description: `Sign Up | ${appConfig.description}`,
}

export default function SignUpPage() {
  return (
    <AuthPageContainer>
      <AuthCard title="Sign Up" description="Create your account with email or Google.">
        <SignUpForm />
      </AuthCard>
    </AuthPageContainer>
  )
}
