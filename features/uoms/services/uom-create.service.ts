import {
  uomCreateRepository,
  uomGetByCodeRepository,
} from "../repositories/uom-create.repository";
import type { UomCreateInput } from "../schemas/uom-create.schema";

export async function uomCreateService(input: UomCreateInput) {
  const existing = await uomGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("UOM code already exists");
  }

  return uomCreateRepository(input);
}
