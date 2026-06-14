import { prisma } from "@/lib/prisma";

export async function emailTemplateDeleteRepository(id: string) {
  return prisma.emailTemplate.delete({
    where: { id },
    select: { id: true },
  });
}

export async function emailTemplateLogCountRepository(templateId: string) {
  return prisma.emailLog.count({
    where: { templateId },
  });
}
