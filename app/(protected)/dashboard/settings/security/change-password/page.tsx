import { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { AuthCard, AuthPageContainer, ChangePasswordForm } from "@/features/auth"

export const metadata: Metadata = {
  title: `Change Password - ${appConfig.appName}`,
  description: `Change Password | ${appConfig.description}`,
}

export default function ChangePasswordPage() {
  return (
    <AuthPageContainer>
      <AuthCard title="Change Password" description="Update your account password.">
        <ChangePasswordForm />
      </AuthCard>
    </AuthPageContainer>
  )
}
