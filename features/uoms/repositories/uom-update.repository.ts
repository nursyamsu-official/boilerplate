import { prisma } from "@/lib/prisma";

import type { UomUpdateInput } from "../schemas/uom-create.schema";

export async function uomUpdateRepository(input: UomUpdateInput) {
  return prisma.uom.update({
    where: { id: input.id },
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

export async function uomToggleStatusRepository(id: string) {
  const current = await prisma.uom.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.uom.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
