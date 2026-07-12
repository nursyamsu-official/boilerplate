import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import { companyOptionsService } from "@/features/companies";
import {
  OrganizationalUnitManagement,
  organizationalUnitGetListService,
  organizationalUnitGetPreviewListService,
  parseOrganizationalUnitFilter,
} from "@/features/organizational-units";

export const metadata: Metadata = {
  title: `Organizational Units | ${appConfig.appName}`,
  description: `Organizational Units | ${appConfig.description}`,
};

type OrganizationalUnitsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function OrganizationalUnitsPage({
  searchParams,
}: OrganizationalUnitsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseOrganizationalUnitFilter(resolvedSearchParams);

  const [initialData, companyOptions, previewItems] = await Promise.all([
    organizationalUnitGetListService(filters),
    companyOptionsService(),
    organizationalUnitGetPreviewListService(),
  ]);

  return (
    <OrganizationalUnitManagement
      initialData={initialData}
      initialFilters={filters}
      companyOptions={companyOptions}
      previewItems={previewItems}
    />
  );
}
