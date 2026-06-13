import {
  permissionModuleCountPermissionsRepository,
  permissionModuleGetByIdRepository,
} from "../repositories/permission-module-create.repository";
import { permissionModuleDeleteRepository } from "../repositories/permission-module-delete.repository";

export async function permissionModuleDeleteService(id: string) {
  const module = await permissionModuleGetByIdRepository(id);
  if (!module) {
    throw new Error("Permission module not found");
  }

  if (module.isSystem) {
    throw new Error("System modules cannot be deleted");
  }

  const permissionCount = await permissionModuleCountPermissionsRepository(id);
  if (permissionCount > 0) {
    throw new Error("Cannot delete module with existing permissions");
  }

  return permissionModuleDeleteRepository(id);
}
