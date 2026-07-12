import { uomListRepository } from "../repositories/uom-list.repository";
import type { UomListFilters } from "../types/uom.type";

export async function uomGetListService(filters: UomListFilters) {
  return uomListRepository(filters);
}
