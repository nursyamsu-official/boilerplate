import type { SsoProviderFilterInput } from "../schemas/sso-provider-filter.schema";

export function buildSsoProviderListUrl(
  filters: SsoProviderFilterInput,
): string {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  params.set("sortBy", filters.sortBy);
  params.set("sortOrder", filters.sortOrder);
  if (filters.status !== "all") params.set("status", filters.status);
  if (filters.protocol !== "all") params.set("protocol", filters.protocol);
  const query = params.toString();
  return query
    ? `/dashboard/admin-page/integration/sso-providers?${query}`
    : "/dashboard/admin-page/integration/sso-providers";
}
