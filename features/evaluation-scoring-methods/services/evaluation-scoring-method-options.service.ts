import { prisma } from "@/lib/prisma";

import type { EvaluationScoringMethodOption } from "../types/evaluation-scoring-method.type";

export async function evaluationScoringMethodOptionsService(): Promise<EvaluationScoringMethodOption[]> {
  return prisma.evaluationScoringMethod.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true },
    orderBy: [{ name: "asc" }],
  });
}
