import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  TwoFactorManagement,
  parseTwoFactorFilter,
  twoFactorGetListService,
} from "@/features/two-factor";

export const metadata: Metadata = {
  title: `Two Factor | ${appConfig.appName}`,
  description: `Two Factor | ${appConfig.description}`,
};

type TwoFactorPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TwoFactorPage({
  searchParams,
}: TwoFactorPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseTwoFactorFilter(resolvedSearchParams);
  const initialData = await twoFactorGetListService(filters);

  return (
    <TwoFactorManagement initialData={initialData} initialFilters={filters} />
  );
}
