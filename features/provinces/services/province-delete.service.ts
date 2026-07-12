import {
  provinceCountDistrictsRepository,
  provinceGetByIdRepository,
} from "../repositories/province-create.repository";
import { provinceDeleteRepository } from "../repositories/province-delete.repository";

export async function provinceDeleteService(id: string) {
  const province = await provinceGetByIdRepository(id);
  if (!province) {
    throw new Error("Province not found");
  }

  const districtCount = await provinceCountDistrictsRepository(id);
  if (districtCount > 0) {
    throw new Error("Cannot delete province with districts");
  }

  return provinceDeleteRepository(id);
}
