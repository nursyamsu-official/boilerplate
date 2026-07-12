import { countryGetByIdRepository } from "../repositories/country-create.repository";
import type { CountryDetail } from "../types/country.type";

export async function countryGetByIdService(id: string): Promise<CountryDetail> {
  const country = await countryGetByIdRepository(id);
  if (!country) {
    throw new Error("Country not found");
  }

  return {
    id: country.id,
    code: country.code,
    name: country.name,
    description: country.description,
    isActive: country.isActive,
  };
}
