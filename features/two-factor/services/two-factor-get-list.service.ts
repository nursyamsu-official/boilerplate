import { twoFactorListRepository } from "../repositories/two-factor-list.repository";
import type { TwoFactorListFilters } from "../types/two-factor.type";

export async function twoFactorGetListService(filters: TwoFactorListFilters) {
  return twoFactorListRepository(filters);
}
