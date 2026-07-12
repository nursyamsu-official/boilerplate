import { prisma } from "@/lib/prisma";

import type { PurchasingGroupUpdateInput } from "../schemas/purchasing-group-create.schema";

export async function purchasingGroupUpdateRepository(
  input: PurchasingGroupUpdateInput,
) {
  return prisma.purchasingGroup.update({
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

export async function purchasingGroupToggleStatusRepository(
  id: string,
  isActive: boolean,
) {
  return prisma.purchasingGroup.update({
    where: { id },
    data: { isActive },
    select: { id: true, isActive: true },
  });
}
