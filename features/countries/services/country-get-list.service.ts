import { countryListRepository } from "../repositories/country-list.repository";
import type { CountryListFilters } from "../types/country.type";

export async function countryGetListService(filters: CountryListFilters) {
  return countryListRepository(filters);
}
