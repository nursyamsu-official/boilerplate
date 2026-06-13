import {
  permissionGetByCodeRepository,
  permissionGetByIdRepository,
  permissionModuleExistsRepository,
} from "../repositories/permission-create.repository";
import { permissionUpdateRepository } from "../repositories/permission-update.repository";
import type { PermissionUpdateInput } from "../schemas/permission-create.schema";

export async function permissionUpdateService(input: PermissionUpdateInput) {
  const permission = await permissionGetByIdRepository(input.id);
  if (!permission) {
    throw new Error("Permission not found");
  }

  if (permission.isSystem && permission.code !== input.code) {
    throw new Error("System permission code cannot be changed");
  }

  const existing = await permissionGetByCodeRepository(input.code);
  if (existing && existing.id !== input.id) {
    throw new Error("Permission code already exists");
  }

  if (input.moduleId) {
    const module = await permissionModuleExistsRepository(input.moduleId);
    if (!module) {
      throw new Error("Permission module not found");
    }
  }

  return permissionUpdateRepository(input);
}
