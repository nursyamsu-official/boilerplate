import { prisma } from "@/lib/prisma";

import type { EmailTemplateUpdateInput } from "../schemas/email-template-create.schema";

export async function emailTemplateUpdateRepository(
  input: EmailTemplateUpdateInput,
) {
  return prisma.emailTemplate.update({
    where: { id: input.id },
    data: {
      code: input.code,
      name: input.name,
      subject: input.subject,
      bodyHtml: input.bodyHtml,
      bodyText: input.bodyText,
      variables: input.variables,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function emailTemplateToggleStatusRepository(id: string) {
  const template = await prisma.emailTemplate.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!template) return null;

  return prisma.emailTemplate.update({
    where: { id },
    data: { isActive: !template.isActive },
    select: { id: true, isActive: true },
  });
}
