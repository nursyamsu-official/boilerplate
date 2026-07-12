import { districtGetByIdRepository } from "../repositories/district-create.repository";
import type { DistrictDetail } from "../types/district.type";

export async function districtGetByIdService(id: string): Promise<DistrictDetail> {
  const district = await districtGetByIdRepository(id);
  if (!district) {
    throw new Error("District not found");
  }

  return {
    id: district.id,
    provinceId: district.provinceId,
    countryId: district.province.countryId,
    code: district.code,
    name: district.name,
    description: district.description,
    isActive: district.isActive,
  };
}
