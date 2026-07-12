import { uomGlobalConversionGetByIdRepository } from "../repositories/uom-global-conversion-create.repository";
import { uomGlobalConversionDeleteRepository } from "../repositories/uom-global-conversion-delete.repository";

export async function uomGlobalConversionDeleteService(id: string) {
  const conversion = await uomGlobalConversionGetByIdRepository(id);
  if (!conversion) {
    throw new Error("Conversion not found");
  }

  return uomGlobalConversionDeleteRepository(id);
}
