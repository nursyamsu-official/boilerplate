import { permissionModuleListRepository } from "../repositories/permission-module-list.repository";
import type { PermissionModuleListFilters } from "../types/permission-module.type";

export async function permissionModuleGetListService(
  filters: PermissionModuleListFilters,
) {
  return permissionModuleListRepository(filters);
}
