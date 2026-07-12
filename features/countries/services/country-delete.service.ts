import {
  countryCountProvincesRepository,
  countryGetByIdRepository,
} from "../repositories/country-create.repository";
import { countryDeleteRepository } from "../repositories/country-delete.repository";

export async function countryDeleteService(id: string) {
  const country = await countryGetByIdRepository(id);
  if (!country) {
    throw new Error("Country not found");
  }

  const provinceCount = await countryCountProvincesRepository(id);
  if (provinceCount > 0) {
    throw new Error("Cannot delete country with provinces");
  }

  return countryDeleteRepository(id);
}
