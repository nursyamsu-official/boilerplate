import { prisma } from "@/lib/prisma";

import type { ProductTypeCreateInput } from "../schemas/product-type-create.schema";

export async function productTypeCreateRepository(input: ProductTypeCreateInput) {
  return prisma.productType.create({
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function productTypeGetByCodeRepository(
  code: string,
  excludeId?: string,
) {
  return prisma.productType.findFirst({
    where: {
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function productTypeGetByIdRepository(id: string) {
  return prisma.productType.findUnique({
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

export async function productTypeCountProductsRepository(id: string) {
  return prisma.product.count({
    where: { productTypeId: id },
  });
}
