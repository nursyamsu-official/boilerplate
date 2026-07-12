import { prisma } from "@/lib/prisma";

import type { ProductCategoryUpdateInput } from "../schemas/product-category-create.schema";

export async function productCategoryUpdateRepository(input: ProductCategoryUpdateInput) {
  return prisma.productCategory.update({
    where: { id: input.id },
    data: {
      groupId: input.groupId,
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function productCategoryToggleStatusRepository(id: string) {
  const current = await prisma.productCategory.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.productCategory.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
