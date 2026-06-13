import { loginHistoryListRepository } from "../repositories/login-history-list.repository";
import type { LoginHistoryListFilters } from "../types/login-history.type";

export async function loginHistoryGetListService(
  filters: LoginHistoryListFilters,
) {
  return loginHistoryListRepository(filters);
}
