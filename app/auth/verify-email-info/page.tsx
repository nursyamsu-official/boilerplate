import type { Metadata } from "next";
import { Suspense } from "react";
import { appConfig } from "@/config/app.config";
import { VerifyEmailInfo } from "@/features/auth";

export const metadata: Metadata = {
  title: `Verify Email | ${appConfig.appName}`,
  description: `Please verify your email address | ${appConfig.description}`,
};

export default function VerifyEmailInfoPage() {
  return (
    <Suspense>
      <VerifyEmailInfo />
    </Suspense>
  );
}
