import type { Metadata } from "next";
import { Suspense } from "react";
import { appConfig } from "@/config/app.config";
import { VerifyEmailChange } from "@/features/auth";

export const metadata: Metadata = {
  title: `Verify Email Change | ${appConfig.appName}`,
  description: `Verify your email change | ${appConfig.description}`,
};

export default function VerifyEmailChangePage() {
  return (
    <Suspense>
      <VerifyEmailChange />
    </Suspense>
  );
}
