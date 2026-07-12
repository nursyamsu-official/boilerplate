import { prisma } from "@/lib/prisma";

import type { ProductGroupCreateInput } from "../schemas/product-group-create.schema";

export async function productGroupCreateRepository(input: ProductGroupCreateInput) {
  return prisma.productGroup.create({
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function productGroupGetByCodeRepository(
  code: string,
  excludeId?: string,
) {
  return prisma.productGroup.findFirst({
    where: {
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function productGroupGetByIdRepository(id: string) {
  return prisma.productGroup.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      isActive: true,
      _count: { select: { products: true } },
    },
  });
}

export async function productGroupCountProductsRepository(id: string) {
  return prisma.product.count({
    where: { productGroupId: id },
  });
}


export async function productGroupCountCategoriesRepository(id: string) {
  return prisma.productCategory.count({ where: { groupId: id } });
}
