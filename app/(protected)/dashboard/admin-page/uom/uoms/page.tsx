import type { Metadata } from "next";
import { appConfig } from "@/config/app.config";
import {
  UomManagement,
  parseUomFilter,
  uomGetListService,
} from "@/features/uoms";

export const metadata: Metadata = {
  title: `UOMs | ${appConfig.appName}`,
  description: `UOMs | ${appConfig.description}`,
};

type UomsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function UomsPage({ searchParams }: UomsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseUomFilter(resolvedSearchParams);
  const initialData = await uomGetListService(filters);

  return (
    <UomManagement initialData={initialData} initialFilters={filters} />
  );
}
