import { uomGetByIdRepository } from "../repositories/uom-create.repository";

export async function uomGetByIdService(id: string) {
  const uom = await uomGetByIdRepository(id);
  if (!uom) {
    throw new Error("UOM not found");
  }

  return uom;
}
