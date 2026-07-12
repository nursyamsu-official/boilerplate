import {
  districtGetByCodeRepository,
  districtGetByIdRepository,
} from "../repositories/district-create.repository";
import {
  districtToggleStatusRepository,
  districtUpdateRepository,
} from "../repositories/district-update.repository";
import type { DistrictUpdateInput } from "../schemas/district-create.schema";

export async function districtUpdateService(input: DistrictUpdateInput) {
  const district = await districtGetByIdRepository(input.id);
  if (!district) {
    throw new Error("District not found");
  }

  const existing = await districtGetByCodeRepository(
    input.provinceId,
    input.code,
    input.id,
  );
  if (existing) {
    throw new Error("District code already exists for this province");
  }

  return districtUpdateRepository(input);
}

export async function districtToggleStatusService(id: string) {
  const district = await districtGetByIdRepository(id);
  if (!district) {
    throw new Error("District not found");
  }

  return districtToggleStatusRepository(id);
}
