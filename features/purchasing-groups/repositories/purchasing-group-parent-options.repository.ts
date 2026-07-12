import { prisma } from "@/lib/prisma";

import type { PurchasingGroupParentOption } from "../types/purchasing-group.type";

export async function purchasingGroupParentOptionsRepository(
  companyId: string,
): Promise<PurchasingGroupParentOption[]> {
  return prisma.purchasingGroup.findMany({
    where: { companyId },
    select: {
      id: true,
      code: true,
      name: true,
      parentId: true,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}
