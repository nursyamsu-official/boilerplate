import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import { countryOptionsService } from "@/features/countries";
import {
  DistrictManagement,
  districtGetListService,
  parseDistrictFilter,
} from "@/features/districts";
import { provinceOptionsService } from "@/features/provinces";

export const metadata: Metadata = {
  title: `Districts | ${appConfig.appName}`,
  description: `Districts | ${appConfig.description}`,
};

type DistrictsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DistrictsPage({
  searchParams,
}: DistrictsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseDistrictFilter(resolvedSearchParams);

  const [initialData, countryOptions, provinceOptions] = await Promise.all([
    districtGetListService(filters),
    countryOptionsService(),
    provinceOptionsService(),
  ]);

  return (
    <DistrictManagement
      initialData={initialData}
      initialFilters={filters}
      countryOptions={countryOptions}
      provinceOptions={provinceOptions}
    />
  );
}
