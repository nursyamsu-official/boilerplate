import { prisma } from "@/lib/prisma";

import type {
  SsoProviderListFilters,
  SsoProviderListResult,
} from "../types/sso-provider.type";

export async function ssoProviderListRepository(
  filters: SsoProviderListFilters,
): Promise<SsoProviderListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.status === "all"
      ? {}
      : { isActive: filters.status === "active" }),
    ...(filters.protocol === "all" ? {} : { protocol: filters.protocol }),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { code: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const skip = (filters.page - 1) * filters.pageSize;

  const [rows, total] = await Promise.all([
    prisma.ssoProvider.findMany({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        protocol: true,
        isActive: true,
        autoProvision: true,
        defaultRoleId: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            userLinks: true,
          },
        },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.ssoProvider.count({ where }),
  ]);

  return {
    items: rows,
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
