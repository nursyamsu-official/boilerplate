import type { ProductFilterInput } from "../schemas/product-filter.schema";

export function buildProductListUrl(filters: ProductFilterInput): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  params.set("sortBy", filters.sortBy);
  params.set("sortOrder", filters.sortOrder);

  if (filters.isActive !== "all") {
    params.set("isActive", filters.isActive);
  }

  if (filters.productTypeId !== "all") {
    params.set("productTypeId", filters.productTypeId);
  }

  if (filters.productGroupId !== "all") {
    params.set("productGroupId", filters.productGroupId);
  }

  if (filters.productCategoryId !== "all") {
    params.set("productCategoryId", filters.productCategoryId);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/product-attribute/products?${query}`
    : "/dashboard/admin-page/product-attribute/products";
}
