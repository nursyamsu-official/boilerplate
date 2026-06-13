import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const sessionSortByValues = ["createdAt", "expiresAt"] as const;
export const sessionSortOrderValues = ["asc", "desc"] as const;
export const sessionStatusFilterValues = ["all", "active", "expired"] as const;

export const sessionFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(sessionSortByValues).default("createdAt"),
  sortOrder: z.enum(sessionSortOrderValues).default("desc"),
  status: z.enum(sessionStatusFilterValues).default("all"),
});

export type SessionFilterInput = z.infer<typeof sessionFilterSchema>;

export function parseSessionFilter(
  searchParams: Record<string, string | string[] | undefined>,
): SessionFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return sessionFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "createdAt",
    sortOrder: getValue("sortOrder") ?? "desc",
    status: getValue("status") ?? "all",
  });
}

export const sessionRevokeSchema = z.object({
  id: z.string().min(1),
  reason: z.string().max(500).optional(),
});

export const sessionRevokeUserSessionsSchema = z.object({
  userId: z.string().min(1),
  reason: z.string().max(500).optional(),
});
