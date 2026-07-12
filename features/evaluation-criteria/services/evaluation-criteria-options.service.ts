import { prisma } from "@/lib/prisma";

import type { EvaluationCriteriaOption } from "../types/evaluation-criteria.type";

export async function evaluationCriteriaOptionsService(): Promise<EvaluationCriteriaOption[]> {
  return prisma.evaluationCriteria.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true, templateId: true },
    orderBy: [{ name: "asc" }],
  });
}
