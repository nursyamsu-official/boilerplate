import { permissionListRepository } from "../repositories/permission-list.repository";
import type { PermissionListFilters } from "../types/permission.type";

export async function permissionGetListService(filters: PermissionListFilters) {
  return permissionListRepository(filters);
}
