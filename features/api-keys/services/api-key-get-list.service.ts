import { apiKeyListRepository } from "../repositories/api-key.repository";
import type { ApiKeyListFilters } from "../types/api-key.type";

export async function apiKeyGetListService(filters: ApiKeyListFilters) {
  return apiKeyListRepository(filters);
}
