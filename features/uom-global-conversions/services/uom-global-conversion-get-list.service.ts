import { uomGlobalConversionListRepository } from "../repositories/uom-global-conversion-list.repository";
import type { UomGlobalConversionListFilters } from "../types/uom-global-conversion.type";

export async function uomGlobalConversionGetListService(
  filters: UomGlobalConversionListFilters,
) {
  return uomGlobalConversionListRepository(filters);
}
