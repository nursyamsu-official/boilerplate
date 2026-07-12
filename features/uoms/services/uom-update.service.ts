import {
  uomGetByCodeRepository,
  uomGetByIdRepository,
} from "../repositories/uom-create.repository";
import {
  uomToggleStatusRepository,
  uomUpdateRepository,
} from "../repositories/uom-update.repository";
import type { UomUpdateInput } from "../schemas/uom-create.schema";

export async function uomUpdateService(input: UomUpdateInput) {
  const uom = await uomGetByIdRepository(input.id);
  if (!uom) {
    throw new Error("UOM not found");
  }

  const existing = await uomGetByCodeRepository(input.code, input.id);
  if (existing) {
    throw new Error("UOM code already exists");
  }

  return uomUpdateRepository(input);
}

export async function uomToggleStatusService(id: string) {
  const uom = await uomGetByIdRepository(id);
  if (!uom) {
    throw new Error("UOM not found");
  }

  return uomToggleStatusRepository(id);
}
