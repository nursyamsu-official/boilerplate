import type { RoleFilterInput } from "../schemas/role-filter.schema";

export function buildRoleListUrl(filters: RoleFilterInput): string {
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
    ? `/dashboard/admin-page/user-management/roles?${query}`
    : "/dashboard/admin-page/user-management/roles";
}
