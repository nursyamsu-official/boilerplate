import type { Metadata } from "next"

import { appConfig } from "@/config/app.config"
import { ChangePasswordForm } from "@/features/auth"

export const metadata: Metadata = {
  title: `Security - ${appConfig.appName}`,
  description: `Manage your account security in ${appConfig.appNameFull}`,
}

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Account security</h1>
        <p className="text-sm text-muted-foreground">
          Change your password and keep your account secure.
        </p>
      </div>

      <ChangePasswordForm />
    </div>
  )
}
