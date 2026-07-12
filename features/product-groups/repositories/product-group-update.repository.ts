import { prisma } from "@/lib/prisma";

import type { ProductGroupUpdateInput } from "../schemas/product-group-create.schema";

export async function productGroupUpdateRepository(input: ProductGroupUpdateInput) {
  return prisma.productGroup.update({
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

export async function productGroupToggleStatusRepository(id: string) {
  const current = await prisma.productGroup.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.productGroup.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
