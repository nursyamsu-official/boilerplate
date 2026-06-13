import {
  permissionModuleGetByCodeRepository,
  permissionModuleGetByIdRepository,
} from "../repositories/permission-module-create.repository";
import {
  permissionModuleToggleStatusRepository,
  permissionModuleUpdateRepository,
} from "../repositories/permission-module-update.repository";
import type { PermissionModuleUpdateInput } from "../schemas/permission-module-create.schema";

export async function permissionModuleUpdateService(
  input: PermissionModuleUpdateInput,
) {
  const module = await permissionModuleGetByIdRepository(input.id);
  if (!module) {
    throw new Error("Permission module not found");
  }

  if (module.isSystem && module.code !== input.code) {
    throw new Error("System module code cannot be changed");
  }

  const existing = await permissionModuleGetByCodeRepository(input.code);
  if (existing && existing.id !== input.id) {
    throw new Error("Module code already exists");
  }

  return permissionModuleUpdateRepository(input);
}

export async function permissionModuleToggleStatusService(id: string) {
  const module = await permissionModuleGetByIdRepository(id);
  if (!module) {
    throw new Error("Permission module not found");
  }

  return permissionModuleToggleStatusRepository(id);
}
