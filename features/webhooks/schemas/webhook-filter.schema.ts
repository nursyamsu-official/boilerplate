import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const webhookSortByValues = [
  "name",
  "url",
  "createdAt",
  "updatedAt",
  "lastDeliveryAt",
] as const;
export const webhookSortOrderValues = ["asc", "desc"] as const;
export const webhookStatusFilterValues = ["all", "active", "inactive"] as const;

export const webhookFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(webhookSortByValues).default("updatedAt"),
  sortOrder: z.enum(webhookSortOrderValues).default("desc"),
  status: z.enum(webhookStatusFilterValues).default("all"),
});

export type WebhookFilterInput = z.infer<typeof webhookFilterSchema>;

export function parseWebhookFilter(
  searchParams: Record<string, string | string[] | undefined>,
): WebhookFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return webhookFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "updatedAt",
    sortOrder: getValue("sortOrder") ?? "desc",
    status: getValue("status") ?? "all",
  });
}
