import { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { AuthCard, AuthPageContainer, StatusCard } from "@/features/auth"

export const metadata: Metadata = {
  title: `Check Email - ${appConfig.appName}`,
  description: `Check Email | ${appConfig.description}`,
}

export default function CheckEmailPage() {
  return (
    <AuthPageContainer>
      <AuthCard
        title="Check your email"
        description="We sent a link to your email address. Follow the link to continue."
      >
        <StatusCard
          title="Check your email"
          description="Open your inbox and continue from the link we sent."
          buttonText="Back to Login"
          href="/sign-in"
        />
      </AuthCard>
    </AuthPageContainer>
  )
}
