import { organizationalUnitListRepository } from "../repositories/organizational-unit-list.repository";
import type { OrganizationalUnitListFilters } from "../types/organizational-unit.type";

export async function organizationalUnitGetListService(
  filters: OrganizationalUnitListFilters,
) {
  return organizationalUnitListRepository(filters);
}
