import { roleGetByIdRepository } from "../repositories/role-create.repository";
import { roleDeleteRepository } from "../repositories/role-delete.repository";

export async function roleDeleteService(id: string) {
  const role = await roleGetByIdRepository(id);
  if (!role) {
    throw new Error("Role not found");
  }

  if (role.isSystem) {
    throw new Error("System roles cannot be deleted");
  }

  return roleDeleteRepository(id);
}
