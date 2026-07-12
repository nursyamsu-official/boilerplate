import type { UomGlobalConversionFilterInput } from "../schemas/uom-global-conversion-filter.schema";

export function buildUomGlobalConversionListUrl(
  filters: UomGlobalConversionFilterInput,
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

  if (filters.fromUomId !== "all") {
    params.set("fromUomId", filters.fromUomId);
  }

  if (filters.toUomId !== "all") {
    params.set("toUomId", filters.toUomId);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/uom/uom-global-conversions?${query}`
    : "/dashboard/admin-page/uom/uom-global-conversions";
}
