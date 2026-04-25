import type { Metadata } from "next";
import { appConfig } from "@/config/app.config";
import { AccountSettings } from "@/features/auth";

export const metadata: Metadata = {
  title: `Account Settings | ${appConfig.appName}`,
  description: `Account Settings | ${appConfig.description}`,
};

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <AccountSettings />
    </div>
  );
}
