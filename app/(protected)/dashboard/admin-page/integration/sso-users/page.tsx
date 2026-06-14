import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import { ssoProviderOptionsService } from "@/features/sso-providers";
import {
  SsoUserManagement,
  parseSsoUserFilter,
  ssoUserGetListService,
} from "@/features/sso-users";
import { userOptionsService } from "@/features/users";

export const metadata: Metadata = {
  title: `SSO Users | ${appConfig.appName}`,
  description: `SSO Users | ${appConfig.description}`,
};

type SsoUsersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SsoUsersPage({ searchParams }: SsoUsersPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseSsoUserFilter(resolvedSearchParams);

  const [initialData, userOptions, providerOptions] = await Promise.all([
    ssoUserGetListService(filters),
    userOptionsService(),
    ssoProviderOptionsService(),
  ]);

  return (
    <SsoUserManagement
      initialData={initialData}
      initialFilters={filters}
      userOptions={userOptions}
      providerOptions={providerOptions}
    />
  );
}
