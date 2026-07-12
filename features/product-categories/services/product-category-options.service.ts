import { prisma } from "@/lib/prisma";

import type { ProductCategoryOption } from "../types/product-category.type";

export async function productCategoryOptionsService(): Promise<ProductCategoryOption[]> {
  return prisma.productCategory.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true, groupId: true },
    orderBy: [{ name: "asc" }],
  });
}
