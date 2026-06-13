import { z } from "zod";

import { appConfig } from "@/config/app.config";

import { userStatusValues } from "./user-create.schema";

export const userSortByValues = [
  "name",
  "email",
  "username",
  "lastLoginAt",
  "createdAt",
] as const;
export const userSortOrderValues = ["asc", "desc"] as const;
export const userStatusFilterValues = ["all", ...userStatusValues] as const;

export const userFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(userSortByValues).default("createdAt"),
  sortOrder: z.enum(userSortOrderValues).default("desc"),
  status: z.enum(userStatusFilterValues).default("all"),
});

export type UserFilterInput = z.infer<typeof userFilterSchema>;

export function parseUserFilter(
  searchParams: Record<string, string | string[] | undefined>,
): UserFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return userFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "createdAt",
    sortOrder: getValue("sortOrder") ?? "desc",
    status: getValue("status") ?? "all",
  });
}
