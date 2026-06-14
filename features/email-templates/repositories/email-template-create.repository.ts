import { prisma } from "@/lib/prisma";

import type { EmailTemplateCreateInput } from "../schemas/email-template-create.schema";

export async function emailTemplateCreateRepository(
  input: EmailTemplateCreateInput,
) {
  return prisma.emailTemplate.create({
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

export async function emailTemplateGetByCodeRepository(code: string) {
  return prisma.emailTemplate.findUnique({
    where: { code },
    select: { id: true },
  });
}

export async function emailTemplateGetByIdRepository(id: string) {
  return prisma.emailTemplate.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      subject: true,
      bodyHtml: true,
      bodyText: true,
      variables: true,
      description: true,
      isActive: true,
      isSystem: true,
    },
  });
}
