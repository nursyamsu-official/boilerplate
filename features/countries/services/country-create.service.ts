import {
  countryCreateRepository,
  countryGetByCodeRepository,
} from "../repositories/country-create.repository";
import type { CountryCreateInput } from "../schemas/country-create.schema";

export async function countryCreateService(input: CountryCreateInput) {
  const existing = await countryGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Country code already exists");
  }

  return countryCreateRepository(input);
}
