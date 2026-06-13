import type { LoginHistoryFilterInput } from "../schemas/login-history-filter.schema";

export function buildLoginHistoryListUrl(
  filters: LoginHistoryFilterInput,
): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  params.set("sortBy", filters.sortBy);
  params.set("sortOrder", filters.sortOrder);

  if (filters.status !== "all") {
    params.set("status", filters.status);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/user-management/login-history?${query}`
    : "/dashboard/admin-page/user-management/login-history";
}
