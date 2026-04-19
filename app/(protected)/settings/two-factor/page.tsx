import type { Metadata } from "next";
import { appConfig } from "@/config/app.config";
import { TwoFactorSettings } from "@/features/auth";

export const metadata: Metadata = {
  title: `Two-Factor Authentication | ${appConfig.appName}`,
  description: `Manage two-factor authentication | ${appConfig.description}`,
};

export default function TwoFactorSettingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <TwoFactorSettings />
    </div>
  );
}
