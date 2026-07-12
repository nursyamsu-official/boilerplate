import {
  provinceGetByCodeRepository,
  provinceGetByIdRepository,
} from "../repositories/province-create.repository";
import {
  provinceToggleStatusRepository,
  provinceUpdateRepository,
} from "../repositories/province-update.repository";
import type { ProvinceUpdateInput } from "../schemas/province-create.schema";

export async function provinceUpdateService(input: ProvinceUpdateInput) {
  const province = await provinceGetByIdRepository(input.id);
  if (!province) {
    throw new Error("Province not found");
  }

  const existing = await provinceGetByCodeRepository(
    input.countryId,
    input.code,
    input.id,
  );
  if (existing) {
    throw new Error("Province code already exists for this country");
  }

  return provinceUpdateRepository(input);
}

export async function provinceToggleStatusService(id: string) {
  const province = await provinceGetByIdRepository(id);
  if (!province) {
    throw new Error("Province not found");
  }

  return provinceToggleStatusRepository(id);
}
