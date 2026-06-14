import { prisma } from "@/lib/prisma";

import type { SsoUserListFilters, SsoUserListResult } from "../types/sso-user.type";

export async function ssoUserListRepository(
  filters: SsoUserListFilters,
): Promise<SsoUserListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.providerId === "all" ? {} : { providerId: filters.providerId }),
    ...(search
      ? {
          OR: [
            { externalId: { contains: search, mode: "insensitive" as const } },
            {
              emailAtProvider: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              displayName: { contains: search, mode: "insensitive" as const },
            },
            {
              user: {
                name: { contains: search, mode: "insensitive" as const },
              },
            },
            {
              user: {
                email: { contains: search, mode: "insensitive" as const },
              },
            },
          ],
        }
      : {}),
  };

  const skip = (filters.page - 1) * filters.pageSize;

  const [rows, total] = await Promise.all([
    prisma.ssoUserLink.findMany({
      where,
      select: {
        id: true,
        userId: true,
        providerId: true,
        externalId: true,
        emailAtProvider: true,
        displayName: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        provider: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.ssoUserLink.count({ where }),
  ]);

  return {
    items: rows,
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
