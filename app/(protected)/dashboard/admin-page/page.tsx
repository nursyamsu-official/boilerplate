import type { Metadata } from "next";
import { appConfig } from "@/config/app.config";

export const metadata: Metadata = {
  title: `Account Settings | ${appConfig.appName}`,
  description: `Account Settings | ${appConfig.description}`,
};

export default function SettingsPage() {
  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
}
