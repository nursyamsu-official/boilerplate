import type { Metadata } from "next";
import { appConfig } from "@/config/app.config";
import { TwoFactorVerifyForm } from "@/features/auth";

export const metadata: Metadata = {
  title: `Two-Factor Authentication | ${appConfig.appName}`,
  description: `Verify your identity | ${appConfig.description}`,
};

export default function TwoFactorPage() {
  return <TwoFactorVerifyForm />;
}
