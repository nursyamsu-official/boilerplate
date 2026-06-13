import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  ApiKeyManagement,
  apiKeyGetListService,
  parseApiKeyFilter,
} from "@/features/api-keys";
import { userOptionsService } from "@/features/users";

export const metadata: Metadata = {
  title: `API Keys | ${appConfig.appName}`,
  description: `API Keys | ${appConfig.description}`,
};

type ApiKeysPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ApiKeysPage({ searchParams }: ApiKeysPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseApiKeyFilter(resolvedSearchParams);

  const [initialData, userOptions] = await Promise.all([
    apiKeyGetListService(filters),
    userOptionsService(),
  ]);

  return (
    <ApiKeyManagement
      initialData={initialData}
      initialFilters={filters}
      userOptions={userOptions}
    />
  );
}
