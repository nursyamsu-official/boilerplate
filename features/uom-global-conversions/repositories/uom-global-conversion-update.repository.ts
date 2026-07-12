import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/lib/prisma";

import type { UomGlobalConversionUpdateInput } from "../schemas/uom-global-conversion-create.schema";

export async function uomGlobalConversionUpdateRepository(
  input: UomGlobalConversionUpdateInput,
) {
  return prisma.uomGlobalConversion.update({
    where: { id: input.id },
    data: {
      fromUomId: input.fromUomId,
      toUomId: input.toUomId,
      conversionFactor: new Prisma.Decimal(input.conversionFactor),
      description: input.description,
      isActive: input.isActive,
    },
    select: { id: true },
  });
}

export async function uomGlobalConversionToggleStatusRepository(id: string) {
  const current = await prisma.uomGlobalConversion.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.uomGlobalConversion.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
