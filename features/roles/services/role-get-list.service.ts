import { roleListRepository } from "../repositories/role-list.repository";
import type { RoleListFilters } from "../types/role.type";

export async function roleGetListService(filters: RoleListFilters) {
  return roleListRepository(filters);
}
