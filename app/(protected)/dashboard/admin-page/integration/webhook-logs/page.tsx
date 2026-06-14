import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  WebhookLogManagement,
  parseWebhookLogFilter,
  webhookLogGetListService,
} from "@/features/webhook-logs";
import { webhookOptionsService } from "@/features/webhooks";

export const metadata: Metadata = {
  title: `Webhook Logs | ${appConfig.appName}`,
  description: `Webhook Logs | ${appConfig.description}`,
};

type WebhookLogsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WebhookLogsPage({
  searchParams,
}: WebhookLogsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseWebhookLogFilter(resolvedSearchParams);

  const [initialData, webhookOptions] = await Promise.all([
    webhookLogGetListService(filters),
    webhookOptionsService(),
  ]);

  return (
    <WebhookLogManagement
      initialData={initialData}
      initialFilters={filters}
      webhookOptions={webhookOptions}
    />
  );
}
