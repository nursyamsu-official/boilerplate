import { prisma } from "@/lib/prisma";

import { uomGlobalConversions, uoms } from "../data/uom";

export async function seedUom() {
  const uomIdByCode = new Map<string, string>();

  for (const uom of uoms) {
    const record = await prisma.uom.upsert({
      where: { code: uom.code },
      update: {
        name: uom.name,
        symbol: uom.symbol,
        description: uom.description,
        uomType: uom.uomType,
        decimalPlaces: uom.decimalPlaces,
        isActive: true,
      },
      create: {
        code: uom.code,
        name: uom.name,
        symbol: uom.symbol,
        description: uom.description,
        uomType: uom.uomType,
        decimalPlaces: uom.decimalPlaces,
        isActive: true,
      },
    });
    uomIdByCode.set(uom.code, record.id);
  }

  for (const conversion of uomGlobalConversions) {
    const fromUomId = uomIdByCode.get(conversion.fromCode);
    const toUomId = uomIdByCode.get(conversion.toCode);

    if (!fromUomId || !toUomId) {
      throw new Error(
        `Missing UOM for conversion ${conversion.fromCode} -> ${conversion.toCode}`,
      );
    }

    await prisma.uomGlobalConversion.upsert({
      where: {
        fromUomId_toUomId: {
          fromUomId,
          toUomId,
        },
      },
      update: {
        conversionFactor: conversion.conversionFactor,
        description: conversion.description,
        isActive: true,
      },
      create: {
        fromUomId,
        toUomId,
        conversionFactor: conversion.conversionFactor,
        description: conversion.description,
        isActive: true,
      },
    });
  }

  console.log("UOM seed complete:");
  console.log(`  uoms:                 ${uoms.length}`);
  console.log(`  global conversions:   ${uomGlobalConversions.length}`);
}
