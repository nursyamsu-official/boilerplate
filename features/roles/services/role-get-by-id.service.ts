import { roleGetByIdRepository } from "../repositories/role-create.repository";
import type { RoleDetail } from "../types/role.type";

export async function roleGetByIdService(id: string): Promise<RoleDetail> {
  const role = await roleGetByIdRepository(id);
  if (!role) {
    throw new Error("Role not found");
  }

  return {
    id: role.id,
    code: role.code,
    name: role.name,
    description: role.description,
    isActive: role.isActive,
    isSystem: role.isSystem,
    permissionIds: role.rolePermissions.map(
      (rolePermission) => rolePermission.permissionId,
    ),
  };
}
