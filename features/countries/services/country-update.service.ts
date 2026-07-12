import {
  countryGetByCodeRepository,
  countryGetByIdRepository,
} from "../repositories/country-create.repository";
import {
  countryToggleStatusRepository,
  countryUpdateRepository,
} from "../repositories/country-update.repository";
import type { CountryUpdateInput } from "../schemas/country-create.schema";

export async function countryUpdateService(input: CountryUpdateInput) {
  const country = await countryGetByIdRepository(input.id);
  if (!country) {
    throw new Error("Country not found");
  }

  const existing = await countryGetByCodeRepository(input.code, input.id);
  if (existing) {
    throw new Error("Country code already exists");
  }

  return countryUpdateRepository(input);
}

export async function countryToggleStatusService(id: string) {
  const country = await countryGetByIdRepository(id);
  if (!country) {
    throw new Error("Country not found");
  }

  return countryToggleStatusRepository(id);
}
