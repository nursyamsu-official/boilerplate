import { prisma } from "@/lib/prisma";

import type { ProductGroupOption } from "../types/product-group.type";

export async function productGroupOptionsService(): Promise<ProductGroupOption[]> {
  return prisma.productGroup.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true },
    orderBy: [{ name: "asc" }],
  });
}
