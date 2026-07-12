import { prisma } from "@/lib/prisma";

import type {
  UomGlobalConversionListFilters,
  UomGlobalConversionListResult,
} from "../types/uom-global-conversion.type";

export async function uomGlobalConversionListRepository(
  filters: UomGlobalConversionListFilters,
): Promise<UomGlobalConversionListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(filters.fromUomId !== "all" ? { fromUomId: filters.fromUomId } : {}),
    ...(filters.toUomId !== "all" ? { toUomId: filters.toUomId } : {}),
    ...(search
      ? {
          OR: [
            {
              fromUom: {
                code: { contains: search, mode: "insensitive" as const },
              },
            },
            {
              fromUom: {
                name: { contains: search, mode: "insensitive" as const },
              },
            },
            {
              toUom: {
                code: { contains: search, mode: "insensitive" as const },
              },
            },
            {
              toUom: {
                name: { contains: search, mode: "insensitive" as const },
              },
            },
          ],
        }
      : {}),
  };

  const skip = (filters.page - 1) * filters.pageSize;

  const [rows, total] = await Promise.all([
    prisma.uomGlobalConversion.findMany({
      where,
      select: {
        id: true,
        fromUomId: true,
        toUomId: true,
        conversionFactor: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        fromUom: { select: { code: true, name: true } },
        toUom: { select: { code: true, name: true } },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.uomGlobalConversion.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      fromUomId: row.fromUomId,
      fromUomCode: row.fromUom.code,
      fromUomName: row.fromUom.name,
      toUomId: row.toUomId,
      toUomCode: row.toUom.code,
      toUomName: row.toUom.name,
      conversionFactor: Number(row.conversionFactor),
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
