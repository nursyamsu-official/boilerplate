import { prisma } from "@/lib/prisma";

import type {
  EvaluationCriteriaListFilters,
  EvaluationCriteriaListResult,
} from "../types/evaluation-criteria.type";

export async function evaluationCriteriaListRepository(
  filters: EvaluationCriteriaListFilters,
): Promise<EvaluationCriteriaListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(filters.templateId !== "all" ? { templateId: filters.templateId } : {}),
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
  const orderBy =
    filters.sortBy === "templateName"
      ? { template: { name: filters.sortOrder } }
      : { [filters.sortBy]: filters.sortOrder };

  const [rows, total] = await Promise.all([
    prisma.evaluationCriteria.findMany({
      where,
      select: {
        id: true,
        templateId: true,
        code: true,
        name: true,
        description: true,
        weight: true,
        maxScore: true,
        sortOrder: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        template: { select: { name: true } },
      },
      orderBy,
      skip,
      take: filters.pageSize,
    }),
    prisma.evaluationCriteria.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      templateId: row.templateId,
      templateName: row.template.name,
      code: row.code,
      name: row.name,
      description: row.description,
      weight: Number(row.weight),
      maxScore: row.maxScore === null ? null : Number(row.maxScore),
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
