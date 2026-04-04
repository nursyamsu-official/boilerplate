import type { Metadata } from "next"

import { appConfig } from "@/config/app.config"

export const metadata: Metadata = {
  title: `Authentication - ${appConfig.appName}`,
  description: `Authentication - ${appConfig.appNameFull}`,
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-6xl items-center justify-center px-4 py-12">
      {children}
    </div>
  )
}
