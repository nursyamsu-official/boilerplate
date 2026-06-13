import {
  permissionModuleCreateRepository,
  permissionModuleGetByCodeRepository,
} from "../repositories/permission-module-create.repository";
import type { PermissionModuleCreateInput } from "../schemas/permission-module-create.schema";

export async function permissionModuleCreateService(
  input: PermissionModuleCreateInput,
) {
  const existing = await permissionModuleGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Module code already exists");
  }

  return permissionModuleCreateRepository(input);
}
