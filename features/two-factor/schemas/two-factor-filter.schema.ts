import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const twoFactorSortByValues = ["verified"] as const;
export const twoFactorSortOrderValues = ["asc", "desc"] as const;
export const twoFactorStatusFilterValues = ["all", "enabled", "disabled"] as const;

export const twoFactorFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(twoFactorSortByValues).default("verified"),
  sortOrder: z.enum(twoFactorSortOrderValues).default("desc"),
  status: z.enum(twoFactorStatusFilterValues).default("all"),
});

export type TwoFactorFilterInput = z.infer<typeof twoFactorFilterSchema>;

export function parseTwoFactorFilter(
  searchParams: Record<string, string | string[] | undefined>,
): TwoFactorFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return twoFactorFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "verified",
    sortOrder: getValue("sortOrder") ?? "desc",
    status: getValue("status") ?? "all",
  });
}

export const twoFactorDisableSchema = z.object({
  userId: z.string().min(1),
});
