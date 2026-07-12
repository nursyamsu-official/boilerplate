import type { PurchasingGroupFilterInput } from "../schemas/purchasing-group-filter.schema";

export function buildPurchasingGroupListUrl(
  filters: PurchasingGroupFilterInput,
): string {
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

  if (filters.companyId !== "all") {
    params.set("companyId", filters.companyId);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/organization/purchasing_groups?${query}`
    : "/dashboard/admin-page/organization/purchasing_groups";
}
