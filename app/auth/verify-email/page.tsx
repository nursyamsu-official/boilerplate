import type { Metadata } from "next";
import { Suspense } from "react";
import { appConfig } from "@/config/app.config";
import { VerifyEmail } from "@/features/auth";

export const metadata: Metadata = {
  title: `Verifying Email | ${appConfig.appName}`,
  description: `Verifying your email address | ${appConfig.description}`,
};

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  );
}
