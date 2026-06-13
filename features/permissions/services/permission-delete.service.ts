import { permissionGetByIdRepository } from "../repositories/permission-create.repository";
import { permissionDeleteRepository } from "../repositories/permission-delete.repository";

export async function permissionDeleteService(id: string) {
  const permission = await permissionGetByIdRepository(id);
  if (!permission) {
    throw new Error("Permission not found");
  }

  if (permission.isSystem) {
    throw new Error("System permissions cannot be deleted");
  }

  return permissionDeleteRepository(id);
}
