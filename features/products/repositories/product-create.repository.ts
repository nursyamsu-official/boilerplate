import { prisma } from "@/lib/prisma";

import type { ProductCreateInput } from "../schemas/product-create.schema";

export async function productCreateRepository(input: ProductCreateInput) {
  return prisma.product.create({
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

export async function productGetByCodeRepository(code: string, excludeId?: string) {
  return prisma.product.findFirst({
    where: {
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function productGetByIdRepository(id: string) {
  return prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      productTypeId: true,
      productGroupId: true,
      productCategoryId: true,
      baseUomId: true,
      isActive: true,
    },
  });
}

export async function productCountRepository() {
  return prisma.product.count();
}

export async function productCategoryGetGroupIdRepository(id: string) {
  return prisma.productCategory.findUnique({
    where: { id },
    select: { groupId: true },
  });
}
