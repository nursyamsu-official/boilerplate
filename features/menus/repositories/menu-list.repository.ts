import { prisma } from "@/lib/prisma";

import type { MenuListFilters, MenuListResult } from "../types/menu.type";

const menuListSelect = {
  id: true,
  code: true,
  label: true,
  path: true,
  icon: true,
  parentId: true,
  sortOrder: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  parent: {
    select: {
      label: true,
    },
  },
} as const;

export async function menuListRepository(
  filters: MenuListFilters,
): Promise<MenuListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(search
      ? {
          OR: [
            { code: { contains: search, mode: "insensitive" as const } },
            { label: { contains: search, mode: "insensitive" as const } },
            { path: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const skip = (filters.page - 1) * filters.pageSize;

  const [rows, total] = await Promise.all([
    prisma.menu.findMany({
      where,
      select: menuListSelect,
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.menu.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      code: row.code,
      label: row.label,
      path: row.path,
      icon: row.icon,
      parentId: row.parentId,
      parentLabel: row.parent?.label ?? null,
      sortOrder: row.sortOrder,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
