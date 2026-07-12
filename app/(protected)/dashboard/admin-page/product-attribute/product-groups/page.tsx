import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  ProductGroupManagement,
  parseProductGroupFilter,
  productGroupGetListService,
} from "@/features/product-groups";

export const metadata: Metadata = {
  title: `Product Groups | ${appConfig.appName}`,
  description: `Product Groups | ${appConfig.description}`,
};

type ProductGroupsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductGroupsPage({
  searchParams,
}: ProductGroupsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseProductGroupFilter(resolvedSearchParams);
  const initialData = await productGroupGetListService(filters);

  return (
    <ProductGroupManagement initialData={initialData} initialFilters={filters} />
  );
}
