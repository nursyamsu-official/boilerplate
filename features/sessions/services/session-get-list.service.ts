import { sessionListRepository } from "../repositories/session-list.repository";
import type { SessionListFilters } from "../types/session.type";

export async function sessionGetListService(filters: SessionListFilters) {
  return sessionListRepository(filters);
}
