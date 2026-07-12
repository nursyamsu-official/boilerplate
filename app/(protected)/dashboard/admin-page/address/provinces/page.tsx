import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import { countryOptionsService } from "@/features/countries";
import {
  ProvinceManagement,
  provinceGetListService,
  parseProvinceFilter,
} from "@/features/provinces";

export const metadata: Metadata = {
  title: `Provinces | ${appConfig.appName}`,
  description: `Provinces | ${appConfig.description}`,
};

type ProvincesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProvincesPage({
  searchParams,
}: ProvincesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseProvinceFilter(resolvedSearchParams);

  const [initialData, countryOptions] = await Promise.all([
    provinceGetListService(filters),
    countryOptionsService(),
  ]);

  return (
    <ProvinceManagement
      initialData={initialData}
      initialFilters={filters}
      countryOptions={countryOptions}
    />
  );
}
