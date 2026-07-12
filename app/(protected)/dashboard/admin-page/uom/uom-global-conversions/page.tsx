import type { Metadata } from "next";
import { appConfig } from "@/config/app.config";
import {
  UomGlobalConversionManagement,
  parseUomGlobalConversionFilter,
  uomGlobalConversionGetListService,
} from "@/features/uom-global-conversions";
import { uomOptionsService } from "@/features/uoms";

export const metadata: Metadata = {
  title: `UOM Global Conversions | ${appConfig.appName}`,
  description: `UOM Global Conversions | ${appConfig.description}`,
};

type UomGlobalConversionsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function UomGlobalConversionsPage({
  searchParams,
}: UomGlobalConversionsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseUomGlobalConversionFilter(resolvedSearchParams);

  const [initialData, uomOptions] = await Promise.all([
    uomGlobalConversionGetListService(filters),
    uomOptionsService(),
  ]);

  return (
    <UomGlobalConversionManagement
      initialData={initialData}
      initialFilters={filters}
      uomOptions={uomOptions}
    />
  );
}
