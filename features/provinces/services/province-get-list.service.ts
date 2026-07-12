import { provinceListRepository } from "../repositories/province-list.repository";
import type { ProvinceListFilters } from "../types/province.type";

export async function provinceGetListService(filters: ProvinceListFilters) {
  return provinceListRepository(filters);
}
