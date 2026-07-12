import { prisma } from "@/lib/prisma";

import type { EvaluationTemplateUpdateInput } from "../schemas/evaluation-template-create.schema";

export async function evaluationTemplateUpdateRepository(
  input: EvaluationTemplateUpdateInput,
) {
  return prisma.evaluationTemplate.update({
    where: { id: input.id },
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      evaluationMethodId: input.evaluationMethodId,
      evaluationScoringMethodId: input.evaluationScoringMethodId,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function evaluationTemplateToggleStatusRepository(id: string) {
  const current = await prisma.evaluationTemplate.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.evaluationTemplate.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
