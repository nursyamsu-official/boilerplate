import { uomGlobalConversionGetByIdRepository } from "../repositories/uom-global-conversion-create.repository";

export async function uomGlobalConversionGetByIdService(id: string) {
  const conversion = await uomGlobalConversionGetByIdRepository(id);
  if (!conversion) {
    throw new Error("Conversion not found");
  }

  return {
    ...conversion,
    conversionFactor: Number(conversion.conversionFactor),
  };
}
