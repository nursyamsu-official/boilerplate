import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const loginHistorySortByValues = ["createdAt"] as const;
export const loginHistorySortOrderValues = ["asc", "desc"] as const;
export const loginHistoryStatusFilterValues = ["all", "SUCCESS", "FAILED"] as const;

export const loginHistoryFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(loginHistorySortByValues).default("createdAt"),
  sortOrder: z.enum(loginHistorySortOrderValues).default("desc"),
  status: z.enum(loginHistoryStatusFilterValues).default("all"),
});

export type LoginHistoryFilterInput = z.infer<typeof loginHistoryFilterSchema>;

export function parseLoginHistoryFilter(
  searchParams: Record<string, string | string[] | undefined>,
): LoginHistoryFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return loginHistoryFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "createdAt",
    sortOrder: getValue("sortOrder") ?? "desc",
    status: getValue("status") ?? "all",
  });
}
