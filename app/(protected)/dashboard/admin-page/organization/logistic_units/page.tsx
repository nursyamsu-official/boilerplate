import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import { companyOptionsService } from "@/features/companies";
import {
  LogisticUnitManagement,
  logisticUnitGetListService,
  logisticUnitGetPreviewListService,
  parseLogisticUnitFilter,
} from "@/features/logistic-units";

export const metadata: Metadata = {
  title: `Logistic Units | ${appConfig.appName}`,
  description: `Logistic Units | ${appConfig.description}`,
};

type LogisticUnitsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LogisticUnitsPage({
  searchParams,
}: LogisticUnitsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseLogisticUnitFilter(resolvedSearchParams);

  const [initialData, companyOptions, previewItems] = await Promise.all([
    logisticUnitGetListService(filters),
    companyOptionsService(),
    logisticUnitGetPreviewListService(),
  ]);

  return (
    <LogisticUnitManagement
      initialData={initialData}
      initialFilters={filters}
      companyOptions={companyOptions}
      previewItems={previewItems}
    />
  );
}
