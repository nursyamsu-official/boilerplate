import { prisma } from "@/lib/prisma";

import type {
  DistrictListFilters,
  DistrictListResult,
} from "../types/district.type";

export async function districtListRepository(
  filters: DistrictListFilters,
): Promise<DistrictListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(filters.provinceId !== "all"
      ? { provinceId: filters.provinceId }
      : filters.countryId !== "all"
        ? { province: { countryId: filters.countryId } }
        : {}),
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
    prisma.district.findMany({
      where,
      select: {
        id: true,
        provinceId: true,
        code: true,
        name: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        province: {
          select: {
            name: true,
            country: { select: { name: true } },
          },
        },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.district.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      provinceId: row.provinceId,
      provinceName: row.province.name,
      countryName: row.province.country.name,
      code: row.code,
      name: row.name,
      description: row.description,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
