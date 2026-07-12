import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import { companyOptionsService } from "@/features/companies";
import {
  PurchasingGroupManagement,
  purchasingGroupGetListService,
  purchasingGroupGetPreviewListService,
  parsePurchasingGroupFilter,
} from "@/features/purchasing-groups";

export const metadata: Metadata = {
  title: `Purchasing Groups | ${appConfig.appName}`,
  description: `Purchasing Groups | ${appConfig.description}`,
};

type PurchasingGroupsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PurchasingGroupsPage({
  searchParams,
}: PurchasingGroupsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parsePurchasingGroupFilter(resolvedSearchParams);

  const [initialData, companyOptions, previewItems] = await Promise.all([
    purchasingGroupGetListService(filters),
    companyOptionsService(),
    purchasingGroupGetPreviewListService(),
  ]);

  return (
    <PurchasingGroupManagement
      initialData={initialData}
      initialFilters={filters}
      companyOptions={companyOptions}
      previewItems={previewItems}
    />
  );
}
