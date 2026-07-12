import { prisma } from "@/lib/prisma";

export async function evaluationScoringMethodDeleteRepository(id: string) {
  return prisma.evaluationScoringMethod.delete({
    where: { id },
    select: { id: true },
  });
}
