import type { UomFilterInput } from "../schemas/uom-filter.schema";

export function buildUomListUrl(filters: UomFilterInput): string {
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

  if (filters.uomType !== "all") {
    params.set("uomType", filters.uomType);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/uom/uoms?${query}`
    : "/dashboard/admin-page/uom/uoms";
}
