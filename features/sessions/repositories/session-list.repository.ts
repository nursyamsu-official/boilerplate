import { prisma } from "@/lib/prisma";

import type {
  SessionListFilters,
  SessionListResult,
} from "../types/session.type";

function buildStatusWhere(status: SessionListFilters["status"]) {
  const now = new Date();

  if (status === "active") {
    return { expiresAt: { gt: now } };
  }

  if (status === "expired") {
    return { expiresAt: { lte: now } };
  }

  return {};
}

export async function sessionListRepository(
  filters: SessionListFilters,
): Promise<SessionListResult> {
  const search = filters.search.trim();
  const skip = (filters.page - 1) * filters.pageSize;

  const where = {
    ...buildStatusWhere(filters.status),
    ...(search
      ? {
          user: {
            OR: [
              { email: { contains: search, mode: "insensitive" as const } },
              { name: { contains: search, mode: "insensitive" as const } },
            ],
          },
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.session.findMany({
      where,
      select: {
        id: true,
        userId: true,
        ipAddress: true,
        userAgent: true,
        createdAt: true,
        updatedAt: true,
        expiresAt: true,
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
    prisma.session.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      userId: row.userId,
      ipAddress: row.ipAddress,
      userAgent: row.userAgent,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      expiresAt: row.expiresAt,
      user: row.user,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}

export async function sessionGetByIdRepository(id: string) {
  return prisma.session.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      ipAddress: true,
      userAgent: true,
      createdAt: true,
      updatedAt: true,
      expiresAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function sessionDeleteRepository(id: string) {
  return prisma.session.delete({
    where: { id },
    select: {
      id: true,
      userId: true,
      ipAddress: true,
      userAgent: true,
      expiresAt: true,
    },
  });
}

export async function sessionDeleteByUserIdRepository(userId: string) {
  return prisma.session.deleteMany({
    where: { userId },
  });
}
