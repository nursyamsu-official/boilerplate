import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  WebhookManagement,
  parseWebhookFilter,
  webhookGetListService,
} from "@/features/webhooks";
import { userOptionsService } from "@/features/users";

export const metadata: Metadata = {
  title: `Webhooks | ${appConfig.appName}`,
  description: `Webhooks | ${appConfig.description}`,
};

type WebhooksPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WebhooksPage({ searchParams }: WebhooksPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseWebhookFilter(resolvedSearchParams);

  const [initialData, userOptions] = await Promise.all([
    webhookGetListService(filters),
    userOptionsService(),
  ]);

  return (
    <WebhookManagement
      initialData={initialData}
      initialFilters={filters}
      userOptions={userOptions}
    />
  );
}
