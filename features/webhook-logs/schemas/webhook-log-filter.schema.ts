import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const webhookLogSortByValues = [
  "createdAt",
  "deliveredAt",
  "event",
  "status",
] as const;
export const webhookLogSortOrderValues = ["asc", "desc"] as const;
export const webhookLogStatusFilterValues = [
  "all",
  "PENDING",
  "SUCCESS",
  "FAILED",
  "RETRYING",
] as const;

export const webhookLogFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(webhookLogSortByValues).default("createdAt"),
  sortOrder: z.enum(webhookLogSortOrderValues).default("desc"),
  status: z.enum(webhookLogStatusFilterValues).default("all"),
  webhookId: z.string().default("all"),
});

export type WebhookLogFilterInput = z.infer<typeof webhookLogFilterSchema>;

export function parseWebhookLogFilter(
  searchParams: Record<string, string | string[] | undefined>,
): WebhookLogFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return webhookLogFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "createdAt",
    sortOrder: getValue("sortOrder") ?? "desc",
    status: getValue("status") ?? "all",
    webhookId: getValue("webhookId") ?? "all",
  });
}
