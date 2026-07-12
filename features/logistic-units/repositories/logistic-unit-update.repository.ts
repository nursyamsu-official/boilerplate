import { prisma } from "@/lib/prisma";

import type { LogisticUnitUpdateInput } from "../schemas/logistic-unit-create.schema";

export async function logisticUnitUpdateRepository(
  input: LogisticUnitUpdateInput,
) {
  return prisma.logisticUnit.update({
    where: { id: input.id },
    data: {
      companyId: input.companyId,
      code: input.code,
      name: input.name,
      description: input.description,
      parentId: input.parentId,
      sortOrder: input.sortOrder,
      isActive: input.isActive,
    },
    select: {
      id: true,
      code: true,
      name: true,
    },
  });
}

export async function logisticUnitToggleStatusRepository(
  id: string,
  isActive: boolean,
) {
  return prisma.logisticUnit.update({
    where: { id },
    data: { isActive },
    select: { id: true, isActive: true },
  });
}
