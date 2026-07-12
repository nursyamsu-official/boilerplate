import {
  districtCreateRepository,
  districtGetByCodeRepository,
} from "../repositories/district-create.repository";
import type { DistrictCreateInput } from "../schemas/district-create.schema";

export async function districtCreateService(input: DistrictCreateInput) {
  const existing = await districtGetByCodeRepository(
    input.provinceId,
    input.code,
  );
  if (existing) {
    throw new Error("District code already exists for this province");
  }

  return districtCreateRepository(input);
}
