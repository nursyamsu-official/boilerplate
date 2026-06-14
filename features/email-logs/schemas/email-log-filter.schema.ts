import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const emailLogSortByValues = ["createdAt", "sentAt", "toEmail"] as const;
export const emailLogSortOrderValues = ["asc", "desc"] as const;
export const emailLogStatusFilterValues = [
  "all",
  "PENDING",
  "SENT",
  "FAILED",
  "BOUNCED",
] as const;

export const emailLogFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(emailLogSortByValues).default("createdAt"),
  sortOrder: z.enum(emailLogSortOrderValues).default("desc"),
  status: z.enum(emailLogStatusFilterValues).default("all"),
});

export type EmailLogFilterInput = z.infer<typeof emailLogFilterSchema>;

export function parseEmailLogFilter(
  searchParams: Record<string, string | string[] | undefined>,
): EmailLogFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return emailLogFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "createdAt",
    sortOrder: getValue("sortOrder") ?? "desc",
    status: getValue("status") ?? "all",
  });
}
