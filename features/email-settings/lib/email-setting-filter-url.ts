import type { EmailSettingFilterInput } from "../schemas/email-setting-filter.schema";

export function buildEmailSettingListUrl(
  filters: EmailSettingFilterInput,
): string {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  params.set("sortBy", filters.sortBy);
  params.set("sortOrder", filters.sortOrder);
  if (filters.isActive !== "all") params.set("isActive", filters.isActive);
  if (filters.provider !== "all") params.set("provider", filters.provider);
  const query = params.toString();
  return query
    ? `/dashboard/admin-page/email/settings?${query}`
    : "/dashboard/admin-page/email/settings";
}
