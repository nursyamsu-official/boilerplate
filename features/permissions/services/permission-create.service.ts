import {
  permissionCreateRepository,
  permissionGetByCodeRepository,
  permissionModuleExistsRepository,
} from "../repositories/permission-create.repository";
import type { PermissionCreateInput } from "../schemas/permission-create.schema";

export async function permissionCreateService(input: PermissionCreateInput) {
  const existing = await permissionGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Permission code already exists");
  }

  if (input.moduleId) {
    const module = await permissionModuleExistsRepository(input.moduleId);
    if (!module) {
      throw new Error("Permission module not found");
    }
  }

  return permissionCreateRepository(input);
}
