import { logisticUnitListRepository } from "../repositories/logistic-unit-list.repository";
import type { LogisticUnitListFilters } from "../types/logistic-unit.type";

export async function logisticUnitGetListService(
  filters: LogisticUnitListFilters,
) {
  return logisticUnitListRepository(filters);
}
