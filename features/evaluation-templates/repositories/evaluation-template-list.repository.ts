import { prisma } from "@/lib/prisma";

import type {
  EvaluationTemplateListFilters,
  EvaluationTemplateListResult,
} from "../types/evaluation-template.type";

export async function evaluationTemplateListRepository(
  filters: EvaluationTemplateListFilters,
): Promise<EvaluationTemplateListResult> {
  const search = filters.search.trim();
  const where = {
    ...(filters.isActive === "all"
      ? {}
      : { isActive: filters.isActive === "true" }),
    ...(filters.evaluationMethodId !== "all"
      ? { evaluationMethodId: filters.evaluationMethodId }
      : {}),
    ...(filters.evaluationScoringMethodId !== "all"
      ? { evaluationScoringMethodId: filters.evaluationScoringMethodId }
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
    prisma.evaluationTemplate.findMany({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        description: true,
        evaluationMethodId: true,
        evaluationScoringMethodId: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        evaluationMethod: { select: { name: true } },
        evaluationScoringMethod: { select: { name: true } },
      },
      orderBy: { [filters.sortBy]: filters.sortOrder },
      skip,
      take: filters.pageSize,
    }),
    prisma.evaluationTemplate.count({ where }),
  ]);

  return {
    items: rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      description: row.description,
      evaluationMethodId: row.evaluationMethodId,
      methodName: row.evaluationMethod.name,
      evaluationScoringMethodId: row.evaluationScoringMethodId,
      scoringMethodName: row.evaluationScoringMethod.name,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    })),
    total,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}
