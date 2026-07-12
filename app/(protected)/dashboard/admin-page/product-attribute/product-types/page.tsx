import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  ProductTypeManagement,
  parseProductTypeFilter,
  productTypeGetListService,
} from "@/features/product-types";

export const metadata: Metadata = {
  title: `Product Types | ${appConfig.appName}`,
  description: `Product Types | ${appConfig.description}`,
};

type ProductTypesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductTypesPage({
  searchParams,
}: ProductTypesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseProductTypeFilter(resolvedSearchParams);
  const initialData = await productTypeGetListService(filters);

  return (
    <ProductTypeManagement initialData={initialData} initialFilters={filters} />
  );
}
