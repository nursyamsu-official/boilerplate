import { prisma } from "@/lib/prisma";

import type {
  PermissionModuleListFilters,
  PermissionModuleListResult,
} from "../types/permission-module.type";

export async function permissionModuleListRepository(
  filters: PermissionModuleListFilters,
): Promise<PermissionModuleListResult> {
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
    prisma.permissionModule.findMany({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        icon: true,
        sortOrder: true,
        isActive: true,
        isSystem: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { permissions: true } },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.permissionModule.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      description: row.description,
      icon: row.icon,
      sortOrder: row.sortOrder,
      isActive: row.isActive,
      isSystem: row.isSystem,
      permissionCount: row._count.permissions,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
