import type { AuditLogFilterInput } from "../schemas/audit-log-filter.schema";

export function buildAuditLogListUrl(filters: AuditLogFilterInput): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.entity) {
    params.set("entity", filters.entity);
  }

  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  params.set("sortBy", filters.sortBy);
  params.set("sortOrder", filters.sortOrder);

  if (filters.action !== "all") {
    params.set("action", filters.action);
  }

  const query = params.toString();
  return query
    ? `/dashboard/admin-page/security/audit-logs?${query}`
    : "/dashboard/admin-page/security/audit-logs";
}

function formatJson(value: string | null) {
  if (!value) return "—";

  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

export { formatJson as formatAuditLogJson };
