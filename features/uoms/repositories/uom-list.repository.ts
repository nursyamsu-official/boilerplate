import { prisma } from "@/lib/prisma";

import type { UomListFilters, UomListResult } from "../types/uom.type";

export async function uomListRepository(
  filters: UomListFilters,
): Promise<UomListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(filters.uomType === "all" ? {} : { uomType: filters.uomType }),
    ...(search
      ? {
          OR: [
            { code: { contains: search, mode: "insensitive" as const } },
            { name: { contains: search, mode: "insensitive" as const } },
            { symbol: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const skip = (filters.page - 1) * filters.pageSize;

  const [rows, total] = await Promise.all([
    prisma.uom.findMany({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        symbol: true,
        description: true,
        uomType: true,
        decimalPlaces: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            conversionsFrom: true,
            conversionsTo: true,
          },
        },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.uom.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      symbol: row.symbol,
      description: row.description,
      uomType: row.uomType,
      decimalPlaces: row.decimalPlaces,
      isActive: row.isActive,
      conversionCount:
        row._count.conversionsFrom + row._count.conversionsTo,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
