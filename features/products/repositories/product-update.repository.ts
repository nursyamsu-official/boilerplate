import { prisma } from "@/lib/prisma";

import type { ProductUpdateInput } from "../schemas/product-create.schema";

export async function productUpdateRepository(input: ProductUpdateInput) {
  return prisma.product.update({
    where: { id: input.id },
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      productTypeId: input.productTypeId,
      productGroupId: input.productGroupId,
      productCategoryId: input.productCategoryId,
      baseUomId: input.baseUomId,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function productToggleStatusRepository(id: string) {
  const current = await prisma.product.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.product.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
