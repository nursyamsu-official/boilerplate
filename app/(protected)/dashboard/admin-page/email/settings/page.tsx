import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  EmailSettingManagement,
  emailSettingGetListService,
  parseEmailSettingFilter,
} from "@/features/email-settings";

export const metadata: Metadata = {
  title: `Email Settings | ${appConfig.appName}`,
  description: `Email Settings | ${appConfig.description}`,
};

type EmailSettingsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EmailSettingsPage({
  searchParams,
}: EmailSettingsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseEmailSettingFilter(resolvedSearchParams);
  const initialData = await emailSettingGetListService(filters);

  return (
    <EmailSettingManagement
      initialData={initialData}
      initialFilters={filters}
    />
  );
}
