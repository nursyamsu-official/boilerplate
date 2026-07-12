import type { Metadata } from "next";

import { appConfig } from "@/config/app.config";
import { productCategoryOptionsService } from "@/features/product-categories";
import { productGroupOptionsService } from "@/features/product-groups";
import {
  ProductManagement,
  parseProductFilter,
  productGetListService,
} from "@/features/products";
import { productTypeOptionsService } from "@/features/product-types";
import { uomOptionsService } from "@/features/uoms";

export const metadata: Metadata = {
  title: `Products | ${appConfig.appName}`,
  description: `Products | ${appConfig.description}`,
};

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseProductFilter(resolvedSearchParams);

  const [initialData, typeOptions, groupOptions, categoryOptions, uomOptions] =
    await Promise.all([
      productGetListService(filters),
      productTypeOptionsService(),
      productGroupOptionsService(),
      productCategoryOptionsService(),
      uomOptionsService(),
    ]);

  return (
    <ProductManagement
      initialData={initialData}
      initialFilters={filters}
      typeOptions={typeOptions}
      groupOptions={groupOptions}
      categoryOptions={categoryOptions}
      uomOptions={uomOptions}
    />
  );
}
