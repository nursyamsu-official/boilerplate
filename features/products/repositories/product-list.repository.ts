import { prisma } from "@/lib/prisma";

import type {
  ProductListFilters,
  ProductListResult,
} from "../types/product.type";

export async function productListRepository(
  filters: ProductListFilters,
): Promise<ProductListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(filters.productTypeId !== "all"
      ? { productTypeId: filters.productTypeId }
      : {}),
    ...(filters.productGroupId !== "all"
      ? { productGroupId: filters.productGroupId }
      : {}),
    ...(filters.productCategoryId !== "all"
      ? { productCategoryId: filters.productCategoryId }
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
    prisma.product.findMany({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        productTypeId: true,
        productGroupId: true,
        productCategoryId: true,
        baseUomId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        productType: { select: { name: true } },
        productGroup: { select: { name: true } },
        productCategory: { select: { name: true } },
        baseUom: { select: { code: true, symbol: true } },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      description: row.description,
      productTypeId: row.productTypeId,
      typeName: row.productType.name,
      productGroupId: row.productGroupId,
      groupName: row.productGroup.name,
      productCategoryId: row.productCategoryId,
      categoryName: row.productCategory.name,
      baseUomId: row.baseUomId,
      baseUomCode: row.baseUom?.code ?? null,
      baseUomSymbol: row.baseUom?.symbol ?? null,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
