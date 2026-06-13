import type { PermissionFilterInput } from "../schemas/permission-filter.schema";

export function buildPermissionListUrl(
  filters: PermissionFilterInput,
): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  params.set("sortBy", filters.sortBy);
  params.set("sortOrder", filters.sortOrder);

  if (filters.moduleId !== "all") {
    params.set("moduleId", filters.moduleId);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/user-management/permissions?${query}`
    : "/dashboard/admin-page/user-management/permissions";
}
