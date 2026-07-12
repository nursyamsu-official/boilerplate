import type { ProvinceFilterInput } from "../schemas/province-filter.schema";

export function buildProvinceListUrl(filters: ProvinceFilterInput): string {
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

  if (filters.countryId !== "all") {
    params.set("countryId", filters.countryId);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/address/provinces?${query}`
    : "/dashboard/admin-page/address/provinces";
}
