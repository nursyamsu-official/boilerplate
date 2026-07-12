import type { ProductTypeFilterInput } from "../schemas/product-type-filter.schema";

export function buildProductTypeListUrl(filters: ProductTypeFilterInput): string {
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

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/product-attribute/product-types?${query}`
    : "/dashboard/admin-page/product-attribute/product-types";
}
