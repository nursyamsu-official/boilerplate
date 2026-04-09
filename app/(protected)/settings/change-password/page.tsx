import type { Metadata } from "next";
import { appConfig } from "@/config/app.config";
import { ChangePasswordForm } from "@/features/auth";

export const metadata: Metadata = {
  title: `Change Password | ${appConfig.appName}`,
  description: `Change your account password | ${appConfig.description}`,
};

export default function ChangePasswordPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <ChangePasswordForm />
    </div>
  );
}
