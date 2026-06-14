import type { WebhookLogFilterInput } from "../schemas/webhook-log-filter.schema";

export function buildWebhookLogListUrl(filters: WebhookLogFilterInput): string {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  params.set("sortBy", filters.sortBy);
  params.set("sortOrder", filters.sortOrder);
  if (filters.status !== "all") params.set("status", filters.status);
  if (filters.webhookId !== "all") params.set("webhookId", filters.webhookId);
  const query = params.toString();
  return query
    ? `/dashboard/admin-page/integration/webhook-logs?${query}`
    : "/dashboard/admin-page/integration/webhook-logs";
}
