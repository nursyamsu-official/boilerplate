import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const auditLogSortByValues = ["createdAt"] as const;
export const auditLogSortOrderValues = ["asc", "desc"] as const;
export const auditLogActionFilterValues = [
  "all",
  "CREATE",
  "UPDATE",
  "DELETE",
  "LOGIN",
  "LOGOUT",
  "EXPORT",
  "IMPORT",
  "ASSIGN",
  "REVOKE",
  "OTHER",
] as const;

export const auditLogFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(auditLogSortByValues).default("createdAt"),
  sortOrder: z.enum(auditLogSortOrderValues).default("desc"),
  action: z.enum(auditLogActionFilterValues).default("all"),
  entity: z.string().default(""),
});

export type AuditLogFilterInput = z.infer<typeof auditLogFilterSchema>;

export function parseAuditLogFilter(
  searchParams: Record<string, string | string[] | undefined>,
): AuditLogFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return auditLogFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "createdAt",
    sortOrder: getValue("sortOrder") ?? "desc",
    action: getValue("action") ?? "all",
    entity: getValue("entity") ?? "",
  });
}
