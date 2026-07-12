import type { DistrictFilterInput } from "../schemas/district-filter.schema";

export function buildDistrictListUrl(filters: DistrictFilterInput): string {
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

  if (filters.provinceId !== "all") {
    params.set("provinceId", filters.provinceId);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/address/districts?${query}`
    : "/dashboard/admin-page/address/districts";
}
