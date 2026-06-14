import type { Metadata } from "next";
import { appConfig } from "@/config/app.config";
import { AccountSettings } from "@/features/auth";

export const metadata: Metadata = {
  title: `Account Settings | ${appConfig.appName}`,
  description: `Account Settings | ${appConfig.description}`,
};

type SettingsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SettingsPage({
  searchParams,
}: SettingsPageProps) {
  const resolvedSearchParams = await searchParams;
  const tab = resolvedSearchParams.tab;
  const initialTab = typeof tab === "string" ? tab : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <AccountSettings initialTab={initialTab} />
    </div>
  );
}
