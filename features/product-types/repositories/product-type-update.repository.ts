import { prisma } from "@/lib/prisma";

import type { ProductTypeUpdateInput } from "../schemas/product-type-create.schema";

export async function productTypeUpdateRepository(input: ProductTypeUpdateInput) {
  return prisma.productType.update({
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

export async function productTypeToggleStatusRepository(id: string) {
  const current = await prisma.productType.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.productType.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
