import { prisma } from "@/lib/prisma";

import type {
  ProductCategoryListFilters,
  ProductCategoryListResult,
} from "../types/product-category.type";

export async function productCategoryListRepository(
  filters: ProductCategoryListFilters,
): Promise<ProductCategoryListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(filters.groupId !== "all" ? { groupId: filters.groupId } : {}),
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
    prisma.productCategory.findMany({
      where,
      select: {
        id: true,
        groupId: true,
        code: true,
        name: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        group: { select: { name: true } },
        _count: { select: { products: true } },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.productCategory.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      groupId: row.groupId,
      groupName: row.group.name,
      code: row.code,
      name: row.name,
      description: row.description,
      isActive: row.isActive,
      productCount: row._count.products,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
