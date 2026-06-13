import { prisma } from "@/lib/prisma";

import type {
  LoginHistoryListFilters,
  LoginHistoryListResult,
} from "../types/login-history.type";

export async function loginHistoryListRepository(
  filters: LoginHistoryListFilters,
): Promise<LoginHistoryListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.status === "all" ? {} : { status: filters.status }),
    ...(search
      ? {
          email: { contains: search, mode: "insensitive" as const },
        }
      : {}),
  };

  const skip = (filters.page - 1) * filters.pageSize;

  const [rows, total] = await Promise.all([
    prisma.loginHistory.findMany({
      where,
      select: {
        id: true,
        userId: true,
        email: true,
        status: true,
        failureReason: true,
        ipAddress: true,
        userAgent: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.loginHistory.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      userId: row.userId,
      email: row.email,
      status: row.status,
      failureReason: row.failureReason,
      ipAddress: row.ipAddress,
      userAgent: row.userAgent,
      createdAt: row.createdAt,
      user: row.user,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
