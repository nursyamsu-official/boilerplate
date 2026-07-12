import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  CountryManagement,
  countryGetListService,
  parseCountryFilter,
} from "@/features/countries";

export const metadata: Metadata = {
  title: `Countries | ${appConfig.appName}`,
  description: `Countries | ${appConfig.description}`,
};

type CountriesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CountriesPage({
  searchParams,
}: CountriesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseCountryFilter(resolvedSearchParams);
  const initialData = await countryGetListService(filters);

  return (
    <CountryManagement initialData={initialData} initialFilters={filters} />
  );
}
