import type { Metadata } from "next";
import { Suspense } from "react";
import { appConfig } from "@/config/app.config";
import { ResetPasswordForm } from "@/features/auth";

export const metadata: Metadata = {
  title: `Reset Password | ${appConfig.appName}`,
  description: `Set your new password | ${appConfig.description}`,
};

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
