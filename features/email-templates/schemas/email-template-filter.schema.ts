import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const emailTemplateSortByValues = [
  "code",
  "name",
  "subject",
  "updatedAt",
  "createdAt",
] as const;
export const emailTemplateSortOrderValues = ["asc", "desc"] as const;
export const emailTemplateActiveFilterValues = ["all", "true", "false"] as const;

export const emailTemplateFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(emailTemplateSortByValues).default("code"),
  sortOrder: z.enum(emailTemplateSortOrderValues).default("asc"),
  isActive: z.enum(emailTemplateActiveFilterValues).default("all"),
});

export type EmailTemplateFilterInput = z.infer<typeof emailTemplateFilterSchema>;

export function parseEmailTemplateFilter(
  searchParams: Record<string, string | string[] | undefined>,
): EmailTemplateFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return emailTemplateFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "code",
    sortOrder: getValue("sortOrder") ?? "asc",
    isActive: getValue("isActive") ?? "all",
  });
}
