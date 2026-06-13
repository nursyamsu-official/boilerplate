import { permissionGetByIdRepository } from "../repositories/permission-create.repository";
import type { PermissionDetail } from "../types/permission.type";

export async function permissionGetByIdService(
  id: string,
): Promise<PermissionDetail> {
  const permission = await permissionGetByIdRepository(id);
  if (!permission) {
    throw new Error("Permission not found");
  }

  return {
    id: permission.id,
    code: permission.code,
    name: permission.name,
    description: permission.description,
    moduleId: permission.moduleId,
    isSystem: permission.isSystem,
  };
}
