import { prisma } from "@/lib/prisma";

import { formatDocumentNumber } from "../lib/document-number-formatter";
import type {
  DocumentTypeListFilters,
  DocumentTypeListResult,
} from "../types/document-type.type";

export async function documentTypeListRepository(
  filters: DocumentTypeListFilters,
): Promise<DocumentTypeListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(filters.categoryId !== "all" ? { categoryId: filters.categoryId } : {}),
    ...(search
      ? {
          OR: [
            { code: { contains: search, mode: "insensitive" as const } },
            { name: { contains: search, mode: "insensitive" as const } },
            { numberPrefix: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const skip = (filters.page - 1) * filters.pageSize;

  const [rows, total] = await Promise.all([
    prisma.documentType.findMany({
      where,
      select: {
        id: true,
        categoryId: true,
        code: true,
        name: true,
        description: true,
        numberPrefix: true,
        numberSeparator: true,
        numberStart: true,
        numberEnd: true,
        numberCurrent: true,
        numberPadding: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        category: { select: { name: true } },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.documentType.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      categoryId: row.categoryId,
      categoryName: row.category.name,
      code: row.code,
      name: row.name,
      description: row.description,
      numberPrefix: row.numberPrefix,
      numberSeparator: row.numberSeparator,
      numberStart: row.numberStart,
      numberEnd: row.numberEnd,
      numberCurrent: row.numberCurrent,
      numberPadding: row.numberPadding,
      numberPreview: formatDocumentNumber({
        prefix: row.numberPrefix,
        separator: row.numberSeparator,
        number: row.numberCurrent,
        padding: row.numberPadding,
      }),
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
