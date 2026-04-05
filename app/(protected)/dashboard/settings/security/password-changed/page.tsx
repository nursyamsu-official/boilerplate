import { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { AuthCard, AuthPageContainer, StatusCard } from "@/features/auth"

export const metadata: Metadata = {
  title: `Password Changed - ${appConfig.appName}`,
  description: `Password Changed | ${appConfig.description}`,
}

export default function PasswordChangedPage() {
  return (
    <AuthPageContainer>
      <AuthCard
        title="Password changed successfully"
        description="Your password has been updated."
      >
        <StatusCard
          title="Password changed successfully"
          description="Use your new password for your next sign in."
          buttonText="Back to Dashboard"
          href="/dashboard"
        />
      </AuthCard>
    </AuthPageContainer>
  )
}
