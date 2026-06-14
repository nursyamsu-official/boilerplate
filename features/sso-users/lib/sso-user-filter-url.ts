import type { SsoUserFilterInput } from "../schemas/sso-user-filter.schema";

export function buildSsoUserListUrl(filters: SsoUserFilterInput): string {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  params.set("sortBy", filters.sortBy);
  params.set("sortOrder", filters.sortOrder);
  if (filters.providerId !== "all") params.set("providerId", filters.providerId);
  const query = params.toString();
  return query
    ? `/dashboard/admin-page/integration/sso-users?${query}`
    : "/dashboard/admin-page/integration/sso-users";
}
