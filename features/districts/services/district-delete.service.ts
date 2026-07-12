import { districtGetByIdRepository } from "../repositories/district-create.repository";
import { districtDeleteRepository } from "../repositories/district-delete.repository";

export async function districtDeleteService(id: string) {
  const district = await districtGetByIdRepository(id);
  if (!district) {
    throw new Error("District not found");
  }

  return districtDeleteRepository(id);
}
