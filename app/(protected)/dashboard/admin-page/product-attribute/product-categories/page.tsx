import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import {
  ProductCategoryManagement,
  parseProductCategoryFilter,
  productCategoryGetListService,
} from "@/features/product-categories";
import { productGroupOptionsService } from "@/features/product-groups";

export const metadata: Metadata = {
  title: `Product Categories | ${appConfig.appName}`,
  description: `Product Categories | ${appConfig.description}`,
};

type ProductCategoriesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductCategoriesPage({
  searchParams,
}: ProductCategoriesPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseProductCategoryFilter(resolvedSearchParams);

  const [initialData, groupOptions] = await Promise.all([
    productCategoryGetListService(filters),
    productGroupOptionsService(),
  ]);

  return (
    <ProductCategoryManagement
      initialData={initialData}
      initialFilters={filters}
      groupOptions={groupOptions}
    />
  );
}
