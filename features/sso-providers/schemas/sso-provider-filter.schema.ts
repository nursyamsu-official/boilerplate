import { z } from "zod";

import { appConfig } from "@/config/app.config";

export const ssoProtocolValues = ["OIDC", "SAML", "OAUTH2"] as const;

export const ssoProviderSortByValues = [
  "name",
  "code",
  "protocol",
  "createdAt",
  "updatedAt",
] as const;
export const ssoProviderSortOrderValues = ["asc", "desc"] as const;
export const ssoProviderStatusFilterValues = ["all", "active", "inactive"] as const;
export const ssoProviderProtocolFilterValues = [
  "all",
  ...ssoProtocolValues,
] as const;

export const ssoProviderFilterSchema = z.object({
  search: z.string().default(""),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(appConfig.pagination.maxLimit)
    .default(appConfig.pagination.defaultLimit),
  sortBy: z.enum(ssoProviderSortByValues).default("updatedAt"),
  sortOrder: z.enum(ssoProviderSortOrderValues).default("desc"),
  status: z.enum(ssoProviderStatusFilterValues).default("all"),
  protocol: z.enum(ssoProviderProtocolFilterValues).default("all"),
});

export type SsoProviderFilterInput = z.infer<typeof ssoProviderFilterSchema>;

export function parseSsoProviderFilter(
  searchParams: Record<string, string | string[] | undefined>,
): SsoProviderFilterInput {
  const getValue = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return ssoProviderFilterSchema.parse({
    search: getValue("search") ?? "",
    page: getValue("page") ?? 1,
    pageSize: getValue("pageSize") ?? appConfig.pagination.defaultLimit,
    sortBy: getValue("sortBy") ?? "updatedAt",
    sortOrder: getValue("sortOrder") ?? "desc",
    status: getValue("status") ?? "all",
    protocol: getValue("protocol") ?? "all",
  });
}
