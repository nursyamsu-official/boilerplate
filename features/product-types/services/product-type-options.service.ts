import { prisma } from "@/lib/prisma";

import type { ProductTypeOption } from "../types/product-type.type";

export async function productTypeOptionsService(): Promise<ProductTypeOption[]> {
  return prisma.productType.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true },
    orderBy: [{ name: "asc" }],
  });
}
