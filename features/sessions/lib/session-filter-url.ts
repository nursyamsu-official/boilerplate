import type { SessionFilterInput } from "../schemas/session-filter.schema";

export function buildSessionListUrl(filters: SessionFilterInput): string {
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
    ? `/dashboard/admin-page/security/sessions?${query}`
    : "/dashboard/admin-page/security/sessions";
}
