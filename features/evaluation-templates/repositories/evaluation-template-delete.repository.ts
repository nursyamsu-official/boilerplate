import { prisma } from "@/lib/prisma";

export async function evaluationTemplateDeleteRepository(id: string) {
  return prisma.evaluationTemplate.delete({
    where: { id },
    select: { id: true },
  });
}
