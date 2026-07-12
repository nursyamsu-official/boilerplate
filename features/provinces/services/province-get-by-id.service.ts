import { provinceGetByIdRepository } from "../repositories/province-create.repository";
import type { ProvinceDetail } from "../types/province.type";

export async function provinceGetByIdService(id: string): Promise<ProvinceDetail> {
  const province = await provinceGetByIdRepository(id);
  if (!province) {
    throw new Error("Province not found");
  }

  return {
    id: province.id,
    countryId: province.countryId,
    code: province.code,
    name: province.name,
    description: province.description,
    isActive: province.isActive,
  };
}
