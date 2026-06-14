import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  SsoProviderManagement,
  parseSsoProviderFilter,
  ssoProviderGetListService,
} from "@/features/sso-providers";
import { roleOptionsService } from "@/features/roles";

export const metadata: Metadata = {
  title: `SSO Providers | ${appConfig.appName}`,
  description: `SSO Providers | ${appConfig.description}`,
};

type SsoProvidersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SsoProvidersPage({
  searchParams,
}: SsoProvidersPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseSsoProviderFilter(resolvedSearchParams);

  const [initialData, roleOptions] = await Promise.all([
    ssoProviderGetListService(filters),
    roleOptionsService(),
  ]);

  return (
    <SsoProviderManagement
      initialData={initialData}
      initialFilters={filters}
      roleOptions={roleOptions}
    />
  );
}
