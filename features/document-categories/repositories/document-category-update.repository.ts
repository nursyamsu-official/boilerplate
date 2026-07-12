import { prisma } from "@/lib/prisma";

import type { DocumentCategoryUpdateInput } from "../schemas/document-category-create.schema";

export async function documentCategoryUpdateRepository(input: DocumentCategoryUpdateInput) {
  return prisma.documentCategory.update({
    where: { id: input.id },
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function documentCategoryToggleStatusRepository(id: string) {
  const current = await prisma.documentCategory.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.documentCategory.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
