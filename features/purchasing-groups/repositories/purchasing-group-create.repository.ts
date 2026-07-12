import { prisma } from "@/lib/prisma";

import type { PurchasingGroupCreateInput } from "../schemas/purchasing-group-create.schema";
import type { PurchasingGroupDetail } from "../types/purchasing-group.type";

export async function purchasingGroupCreateRepository(
  input: PurchasingGroupCreateInput,
) {
  return prisma.purchasingGroup.create({
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

export async function purchasingGroupGetByIdRepository(
  id: string,
): Promise<PurchasingGroupDetail | null> {
  return prisma.purchasingGroup.findUnique({
    where: { id },
    select: {
      id: true,
      companyId: true,
      code: true,
      name: true,
      description: true,
      parentId: true,
      sortOrder: true,
      isActive: true,
    },
  });
}

export async function purchasingGroupGetByCodeRepository(
  companyId: string,
  code: string,
  excludeId?: string,
): Promise<{ id: string } | null> {
  return prisma.purchasingGroup.findFirst({
    where: {
      companyId,
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}
