import { prisma } from "@/lib/prisma";

import type { EvaluationMethodOption } from "../types/evaluation-method.type";

export async function evaluationMethodOptionsService(): Promise<EvaluationMethodOption[]> {
  return prisma.evaluationMethod.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true },
    orderBy: [{ name: "asc" }],
  });
}
