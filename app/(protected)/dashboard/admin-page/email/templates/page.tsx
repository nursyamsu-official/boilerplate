import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  EmailTemplateManagement,
  emailTemplateGetListService,
  parseEmailTemplateFilter,
} from "@/features/email-templates";

export const metadata: Metadata = {
  title: `Email Templates | ${appConfig.appName}`,
  description: `Email Templates | ${appConfig.description}`,
};

type EmailTemplatesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EmailTemplatesPage({
  searchParams,
}: EmailTemplatesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseEmailTemplateFilter(resolvedSearchParams);
  const initialData = await emailTemplateGetListService(filters);

  return (
    <EmailTemplateManagement
      initialData={initialData}
      initialFilters={filters}
    />
  );
}
