import { purchasingGroupListRepository } from "../repositories/purchasing-group-list.repository";
import type { PurchasingGroupListFilters } from "../types/purchasing-group.type";

export async function purchasingGroupGetListService(
  filters: PurchasingGroupListFilters,
) {
  return purchasingGroupListRepository(filters);
}
