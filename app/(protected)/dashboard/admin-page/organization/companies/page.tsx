import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  CompanyManagement,
  companyGetListService,
  parseCompanyFilter,
} from "@/features/companies";

export const metadata: Metadata = {
  title: `Companies | ${appConfig.appName}`,
  description: `Companies | ${appConfig.description}`,
};

type CompaniesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CompaniesPage({
  searchParams,
}: CompaniesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseCompanyFilter(resolvedSearchParams);
  const initialData = await companyGetListService(filters);

  return (
    <CompanyManagement initialData={initialData} initialFilters={filters} />
  );
}
