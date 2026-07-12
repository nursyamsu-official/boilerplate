import { prisma } from "@/lib/prisma";

import type { DocumentTypeUpdateInput } from "../schemas/document-type-create.schema";

export async function documentTypeUpdateRepository(input: DocumentTypeUpdateInput) {
  return prisma.documentType.update({
    where: { id: input.id },
    data: {
      categoryId: input.categoryId,
      code: input.code,
      name: input.name,
      description: input.description,
      numberPrefix: input.numberPrefix,
      numberSeparator: input.numberSeparator,
      numberStart: input.numberStart,
      numberEnd: input.numberEnd,
      numberCurrent: input.numberCurrent,
      numberPadding: input.numberPadding,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function documentTypeToggleStatusRepository(id: string) {
  const current = await prisma.documentType.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.documentType.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
