import { prisma } from "@/lib/prisma";

import type {
  TwoFactorListFilters,
  TwoFactorListResult,
} from "../types/two-factor.type";

function buildUserWhere(filters: TwoFactorListFilters) {
  const search = filters.search.trim();
  const userWhere: {
    twoFactorEnabled?: boolean | { not: true };
    OR?: Array<{
      email?: { contains: string; mode: "insensitive" };
      name?: { contains: string; mode: "insensitive" };
    }>;
  } = {};

  if (filters.status === "enabled") {
    userWhere.twoFactorEnabled = true;
  }

  if (filters.status === "disabled") {
    userWhere.twoFactorEnabled = { not: true };
  }

  if (search) {
    userWhere.OR = [
      { email: { contains: search, mode: "insensitive" } },
      { name: { contains: search, mode: "insensitive" } },
    ];
  }

  return Object.keys(userWhere).length > 0 ? { user: userWhere } : {};
}

export async function twoFactorListRepository(
  filters: TwoFactorListFilters,
): Promise<TwoFactorListResult> {
  const skip = (filters.page - 1) * filters.pageSize;

  const where = buildUserWhere(filters);

  const [rows, total] = await Promise.all([
    prisma.twoFactor.findMany({
      where,
      select: {
        id: true,
        userId: true,
        verified: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            twoFactorEnabled: true,
          },
        },
      },
      orderBy: { verified: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.twoFactor.count({ where }),
  ]);

  return {
    items: rows,
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}

export async function twoFactorGetByUserIdRepository(userId: string) {
  return prisma.twoFactor.findFirst({
    where: { userId },
    select: {
      id: true,
      userId: true,
      verified: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          twoFactorEnabled: true,
        },
      },
    },
  });
}

export async function twoFactorDisableRepository(userId: string) {
  return prisma.$transaction(async (tx) => {
    await tx.twoFactor.deleteMany({ where: { userId } });

    return tx.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: false },
      select: {
        id: true,
        email: true,
        twoFactorEnabled: true,
      },
    });
  });
}
