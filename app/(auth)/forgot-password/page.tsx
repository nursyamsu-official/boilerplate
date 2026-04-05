import { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { AuthCard, AuthPageContainer, ForgotPasswordForm } from "@/features/auth"

export const metadata: Metadata = {
  title: `Forgot Password - ${appConfig.appName}`,
  description: `Forgot Password | ${appConfig.description}`,
}

export default function ForgotPasswordPage() {
  return (
    <AuthPageContainer>
      <AuthCard
        title="Forgot Password"
        description="Enter your email and we will send you a reset link."
      >
        <ForgotPasswordForm />
      </AuthCard>
    </AuthPageContainer>
  )
}
