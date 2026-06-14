import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  EmailLogManagement,
  emailLogGetListService,
  parseEmailLogFilter,
} from "@/features/email-logs";

export const metadata: Metadata = {
  title: `Email Logs | ${appConfig.appName}`,
  description: `Email Logs | ${appConfig.description}`,
};

type EmailLogsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EmailLogsPage({
  searchParams,
}: EmailLogsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseEmailLogFilter(resolvedSearchParams);
  const initialData = await emailLogGetListService(filters);

  return (
    <EmailLogManagement initialData={initialData} initialFilters={filters} />
  );
}
