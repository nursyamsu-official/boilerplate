import { prisma } from "@/lib/prisma";

import type {
  ProvinceListFilters,
  ProvinceListResult,
} from "../types/province.type";

export async function provinceListRepository(
  filters: ProvinceListFilters,
): Promise<ProvinceListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(filters.countryId !== "all" ? { countryId: filters.countryId } : {}),
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
    prisma.province.findMany({
      where,
      select: {
        id: true,
        countryId: true,
        code: true,
        name: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        country: { select: { name: true } },
        _count: { select: { districts: true } },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.province.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      countryId: row.countryId,
      countryName: row.country.name,
      code: row.code,
      name: row.name,
      description: row.description,
      isActive: row.isActive,
      districtCount: row._count.districts,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
