import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const emailProviderValues = [
  "SMTP",
  "SENDGRID",
  "MAILGUN",
  "SES",
  "RESEND",
  "POSTMARK",
] as const;

export const emailSettingSortByValues = [
  "name",
  "provider",
  "fromEmail",
  "updatedAt",
  "createdAt",
] as const;
export const emailSettingSortOrderValues = ["asc", "desc"] as const;
export const emailSettingActiveFilterValues = ["all", "true", "false"] as const;
export const emailSettingProviderFilterValues = [
  "all",
  ...emailProviderValues,
] as const;

export const emailSettingFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(emailSettingSortByValues).default("updatedAt"),
  sortOrder: z.enum(emailSettingSortOrderValues).default("desc"),
  isActive: z.enum(emailSettingActiveFilterValues).default("all"),
  provider: z.enum(emailSettingProviderFilterValues).default("all"),
});

export type EmailSettingFilterInput = z.infer<typeof emailSettingFilterSchema>;

export function parseEmailSettingFilter(
  searchParams: Record<string, string | string[] | undefined>,
): EmailSettingFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return emailSettingFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "updatedAt",
    sortOrder: getValue("sortOrder") ?? "desc",
    isActive: getValue("isActive") ?? "all",
    provider: getValue("provider") ?? "all",
  });
}
