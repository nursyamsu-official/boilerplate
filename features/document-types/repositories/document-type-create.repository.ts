import { prisma } from "@/lib/prisma";

import type { DocumentTypeCreateInput } from "../schemas/document-type-create.schema";

export async function documentTypeCreateRepository(input: DocumentTypeCreateInput) {
  return prisma.documentType.create({
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

export async function documentTypeGetByCodeRepository(
  categoryId: string,
  code: string,
  excludeId?: string,
) {
  return prisma.documentType.findFirst({
    where: {
      categoryId,
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function documentTypeGetByIdRepository(id: string) {
  return prisma.documentType.findUnique({
    where: { id },
    select: {
      id: true,
      categoryId: true,
      code: true,
      name: true,
      description: true,
      numberPrefix: true,
      numberSeparator: true,
      numberStart: true,
      numberEnd: true,
      numberCurrent: true,
      numberPadding: true,
      isActive: true,
    },
  });
}
