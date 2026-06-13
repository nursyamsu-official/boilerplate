import { prisma } from "@/lib/prisma";

import type { RoleListFilters, RoleListResult } from "../types/role.type";

export async function roleListRepository(
  filters: RoleListFilters,
): Promise<RoleListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(search
      ? {
          OR: [
            { code: { contains: search, mode: "insensitive" as const } },
            { name: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const skip = (filters.page - 1) * filters.pageSize;

  const [rows, total] = await Promise.all([
    prisma.role.findMany({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        isActive: true,
        isSystem: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { rolePermissions: true } },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.role.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      description: row.description,
      isActive: row.isActive,
      isSystem: row.isSystem,
      permissionCount: row._count.rolePermissions,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
