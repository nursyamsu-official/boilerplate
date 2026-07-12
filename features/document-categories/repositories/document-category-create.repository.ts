import { prisma } from "@/lib/prisma";

import type { DocumentCategoryCreateInput } from "../schemas/document-category-create.schema";

export async function documentCategoryCreateRepository(input: DocumentCategoryCreateInput) {
  return prisma.documentCategory.create({
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function documentCategoryGetByCodeRepository(
  code: string,
  excludeId?: string,
) {
  return prisma.documentCategory.findFirst({
    where: {
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function documentCategoryGetByIdRepository(id: string) {
  return prisma.documentCategory.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      isActive: true,
      _count: { select: { documentTypes: true } },
    },
  });
}

export async function documentCategoryCountDocumentTypesRepository(id: string) {
  return prisma.documentType.count({
    where: { categoryId: id },
  });
}
