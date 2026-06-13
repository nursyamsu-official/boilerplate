import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  LoginHistoryManagement,
  loginHistoryGetListService,
  parseLoginHistoryFilter,
} from "@/features/login-history";

export const metadata: Metadata = {
  title: `Login History | ${appConfig.appName}`,
  description: `Login History | ${appConfig.description}`,
};

type LoginHistoryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginHistoryPage({
  searchParams,
}: LoginHistoryPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseLoginHistoryFilter(resolvedSearchParams);
  const initialData = await loginHistoryGetListService(filters);

  return (
    <LoginHistoryManagement
      initialData={initialData}
      initialFilters={filters}
    />
  );
}
