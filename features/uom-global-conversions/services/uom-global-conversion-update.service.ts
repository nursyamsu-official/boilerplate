import {
  uomGetByIdForConversionRepository,
  uomGlobalConversionGetByIdRepository,
  uomGlobalConversionGetByPairRepository,
} from "../repositories/uom-global-conversion-create.repository";
import {
  uomGlobalConversionToggleStatusRepository,
  uomGlobalConversionUpdateRepository,
} from "../repositories/uom-global-conversion-update.repository";
import type { UomGlobalConversionUpdateInput } from "../schemas/uom-global-conversion-create.schema";

export async function uomGlobalConversionUpdateService(
  input: UomGlobalConversionUpdateInput,
) {
  const conversion = await uomGlobalConversionGetByIdRepository(input.id);
  if (!conversion) {
    throw new Error("Conversion not found");
  }

  const [fromUom, toUom] = await Promise.all([
    uomGetByIdForConversionRepository(input.fromUomId),
    uomGetByIdForConversionRepository(input.toUomId),
  ]);

  if (!fromUom) {
    throw new Error("From UOM not found");
  }

  if (!toUom) {
    throw new Error("To UOM not found");
  }

  const existing = await uomGlobalConversionGetByPairRepository(
    input.fromUomId,
    input.toUomId,
    input.id,
  );

  if (existing) {
    throw new Error("Conversion for this UOM pair already exists");
  }

  return uomGlobalConversionUpdateRepository(input);
}

export async function uomGlobalConversionToggleStatusService(id: string) {
  const conversion = await uomGlobalConversionGetByIdRepository(id);
  if (!conversion) {
    throw new Error("Conversion not found");
  }

  return uomGlobalConversionToggleStatusRepository(id);
}
