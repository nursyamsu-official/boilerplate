import { prisma } from "@/lib/prisma";

import type {
  PermissionListFilters,
  PermissionListResult,
} from "../types/permission.type";

export async function permissionListRepository(
  filters: PermissionListFilters,
): Promise<PermissionListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.moduleId === "all" ? {} : { moduleId: filters.moduleId }),
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
    prisma.permission.findMany({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        moduleId: true,
        isSystem: true,
        createdAt: true,
        updatedAt: true,
        module: {
          select: {
            code: true,
            name: true,
          },
        },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.permission.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      description: row.description,
      moduleId: row.moduleId,
      moduleCode: row.module?.code ?? null,
      moduleName: row.module?.name ?? null,
      isSystem: row.isSystem,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
