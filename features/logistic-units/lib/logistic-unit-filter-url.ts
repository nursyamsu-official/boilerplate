import type { LogisticUnitFilterInput } from "../schemas/logistic-unit-filter.schema";

export function buildLogisticUnitListUrl(
  filters: LogisticUnitFilterInput,
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
    ? `/dashboard/admin-page/organization/logistic_units?${query}`
    : "/dashboard/admin-page/organization/logistic_units";
}
