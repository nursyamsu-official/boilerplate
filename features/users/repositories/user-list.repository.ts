import { prisma } from "@/lib/prisma";

import type { UserListFilters, UserListResult } from "../types/user.type";

export async function userListRepository(
  filters: UserListFilters,
): Promise<UserListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.status === "all" ? {} : { status: filters.status }),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            { username: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const skip = (filters.page - 1) * filters.pageSize;

  const [rows, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
        userRoles: {
          select: {
            role: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      username: row.username,
      status: row.status,
      roleNames: row.userRoles.map((userRole) => userRole.role.name).join(", "),
      lastLoginAt: row.lastLoginAt,
      createdAt: row.createdAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
