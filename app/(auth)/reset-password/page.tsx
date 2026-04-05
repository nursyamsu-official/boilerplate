import { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { AuthCard, AuthPageContainer, ResetPasswordForm } from "@/features/auth"

export const metadata: Metadata = {
  title: `Reset Password - ${appConfig.appName}`,
  description: `Reset Password | ${appConfig.description}`,
}

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams

  return (
    <AuthPageContainer>
      <AuthCard title="Reset Password" description="Set a new password for your account.">
        <ResetPasswordForm token={token} />
      </AuthCard>
    </AuthPageContainer>
  )
}
