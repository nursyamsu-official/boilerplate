import { districtListRepository } from "../repositories/district-list.repository";
import type { DistrictListFilters } from "../types/district.type";

export async function districtGetListService(filters: DistrictListFilters) {
  return districtListRepository(filters);
}
