import { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { AuthCard, AuthPageContainer, VerifyEmailCard } from "@/features/auth"

export const metadata: Metadata = {
  title: `Verify Email - ${appConfig.appName}`,
  description: `Verify Email | ${appConfig.description}`,
}

type VerifyEmailPageProps = {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { token } = await searchParams

  return (
    <AuthPageContainer>
      <AuthCard
        title="Verify Email"
        description="Verify your email to continue to your dashboard."
      >
        <VerifyEmailCard token={token} />
      </AuthCard>
    </AuthPageContainer>
  )
}
