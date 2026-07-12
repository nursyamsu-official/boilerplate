import {
  uomCountConversionsRepository,
  uomGetByIdRepository,
} from "../repositories/uom-create.repository";
import { uomDeleteRepository } from "../repositories/uom-delete.repository";

export async function uomDeleteService(id: string) {
  const uom = await uomGetByIdRepository(id);
  if (!uom) {
    throw new Error("UOM not found");
  }

  const conversionCount = await uomCountConversionsRepository(id);
  if (conversionCount > 0) {
    throw new Error("Cannot delete UOM used in global conversions");
  }

  return uomDeleteRepository(id);
}
