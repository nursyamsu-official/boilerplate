import { prisma } from "@/lib/prisma";

import type { UomCreateInput } from "../schemas/uom-create.schema";

export async function uomCreateRepository(input: UomCreateInput) {
  return prisma.uom.create({
    data: {
      code: input.code,
      name: input.name,
      symbol: input.symbol,
      description: input.description,
      uomType: input.uomType,
      decimalPlaces: input.decimalPlaces,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function uomGetByCodeRepository(code: string, excludeId?: string) {
  return prisma.uom.findFirst({
    where: {
      code,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function uomGetByIdRepository(id: string) {
  return prisma.uom.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      symbol: true,
      description: true,
      uomType: true,
      decimalPlaces: true,
      isActive: true,
    },
  });
}

export async function uomCountConversionsRepository(id: string) {
  const [fromCount, toCount] = await Promise.all([
    prisma.uomGlobalConversion.count({ where: { fromUomId: id } }),
    prisma.uomGlobalConversion.count({ where: { toUomId: id } }),
  ]);

  return fromCount + toCount;
}
