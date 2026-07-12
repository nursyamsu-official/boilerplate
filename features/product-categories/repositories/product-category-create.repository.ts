import { prisma } from "@/lib/prisma";

import type { ProductCategoryCreateInput } from "../schemas/product-category-create.schema";

export async function productCategoryCreateRepository(input: ProductCategoryCreateInput) {
  return prisma.productCategory.create({
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

export async function productCategoryGetByCodeRepository(
  groupId: string,
  code: string,
  excludeId?: string,
) {
  return prisma.productCategory.findFirst({
    where: {
      groupId,
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function productCategoryGetByIdRepository(id: string) {
  return prisma.productCategory.findUnique({
    where: { id },
    select: {
      id: true,
      groupId: true,
      code: true,
      name: true,
      description: true,
      isActive: true,
      _count: { select: { products: true } },
    },
  });
}

export async function productCategoryCountProductsRepository(id: string) {
  return prisma.product.count({
    where: { productCategoryId: id },
  });
}
