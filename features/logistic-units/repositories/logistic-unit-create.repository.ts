import { prisma } from "@/lib/prisma";

import type { LogisticUnitCreateInput } from "../schemas/logistic-unit-create.schema";
import type { LogisticUnitDetail } from "../types/logistic-unit.type";

export async function logisticUnitCreateRepository(
  input: LogisticUnitCreateInput,
) {
  return prisma.logisticUnit.create({
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

export async function logisticUnitGetByIdRepository(
  id: string,
): Promise<LogisticUnitDetail | null> {
  return prisma.logisticUnit.findUnique({
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

export async function logisticUnitGetByCodeRepository(
  companyId: string,
  code: string,
  excludeId?: string,
): Promise<{ id: string } | null> {
  return prisma.logisticUnit.findFirst({
    where: {
      companyId,
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}
