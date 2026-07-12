import { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/lib/prisma";

import type { UomGlobalConversionCreateInput } from "../schemas/uom-global-conversion-create.schema";

export async function uomGlobalConversionCreateRepository(
  input: UomGlobalConversionCreateInput,
) {
  return prisma.uomGlobalConversion.create({
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

export async function uomGlobalConversionGetByPairRepository(
  fromUomId: string,
  toUomId: string,
  excludeId?: string,
) {
  return prisma.uomGlobalConversion.findFirst({
    where: {
      fromUomId,
      toUomId,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
}

export async function uomGlobalConversionGetByIdRepository(id: string) {
  return prisma.uomGlobalConversion.findUnique({
    where: { id },
    select: {
      id: true,
      fromUomId: true,
      toUomId: true,
      conversionFactor: true,
      description: true,
      isActive: true,
    },
  });
}

export async function uomGetByIdForConversionRepository(id: string) {
  return prisma.uom.findUnique({
    where: { id },
    select: { id: true, isActive: true },
  });
}
