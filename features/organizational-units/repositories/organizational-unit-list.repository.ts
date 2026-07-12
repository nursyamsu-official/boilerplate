import { prisma } from "@/lib/prisma";

import type {
  OrganizationalUnitListFilters,
  OrganizationalUnitListResult,
} from "../types/organizational-unit.type";

const organizationalUnitListSelect = {
  id: true,
  code: true,
  name: true,
  description: true,
  companyId: true,
  parentId: true,
  sortOrder: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  company: {
    select: {
      name: true,
    },
  },
  parent: {
    select: {
      name: true,
    },
  },
  _count: {
    select: {
      children: true,
    },
  },
} as const;

export async function organizationalUnitListRepository(
  filters: OrganizationalUnitListFilters,
): Promise<OrganizationalUnitListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(filters.companyId !== "all" ? { companyId: filters.companyId } : {}),
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
    prisma.organizationalUnit.findMany({
      where,
      select: organizationalUnitListSelect,
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.organizationalUnit.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      description: row.description,
      companyId: row.companyId,
      companyName: row.company.name,
      parentId: row.parentId,
      parentName: row.parent?.name ?? null,
      sortOrder: row.sortOrder,
      isActive: row.isActive,
      childCount: row._count.children,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
