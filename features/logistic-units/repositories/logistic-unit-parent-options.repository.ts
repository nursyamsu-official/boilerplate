import { prisma } from "@/lib/prisma";

import type { LogisticUnitParentOption } from "../types/logistic-unit.type";

export async function logisticUnitParentOptionsRepository(
  companyId: string,
): Promise<LogisticUnitParentOption[]> {
  return prisma.logisticUnit.findMany({
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
