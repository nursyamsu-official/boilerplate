import {
  uomGetByIdForConversionRepository,
  uomGlobalConversionCreateRepository,
  uomGlobalConversionGetByPairRepository,
} from "../repositories/uom-global-conversion-create.repository";
import type { UomGlobalConversionCreateInput } from "../schemas/uom-global-conversion-create.schema";

export async function uomGlobalConversionCreateService(
  input: UomGlobalConversionCreateInput,
) {
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
  );

  if (existing) {
    throw new Error("Conversion for this UOM pair already exists");
  }

  return uomGlobalConversionCreateRepository(input);
}
