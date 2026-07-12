import { prisma } from "@/lib/prisma";

import type { EvaluationTemplateOption } from "../types/evaluation-template.type";

export async function evaluationTemplateOptionsService(): Promise<
  EvaluationTemplateOption[]
> {
  return prisma.evaluationTemplate.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true },
    orderBy: [{ name: "asc" }],
  });
}
