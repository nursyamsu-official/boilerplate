import {
  roleGetByCodeRepository,
  roleGetByIdRepository,
} from "../repositories/role-create.repository";
import {
  roleToggleStatusRepository,
  roleUpdateRepository,
} from "../repositories/role-update.repository";
import type { RoleUpdateInput } from "../schemas/role-create.schema";

export async function roleUpdateService(input: RoleUpdateInput) {
  const role = await roleGetByIdRepository(input.id);
  if (!role) {
    throw new Error("Role not found");
  }

  if (role.isSystem && role.code !== input.code) {
    throw new Error("System role code cannot be changed");
  }

  const existing = await roleGetByCodeRepository(input.code);
  if (existing && existing.id !== input.id) {
    throw new Error("Role code already exists");
  }

  return roleUpdateRepository(input);
}

export async function roleToggleStatusService(id: string) {
  const role = await roleGetByIdRepository(id);
  if (!role) {
    throw new Error("Role not found");
  }

  return roleToggleStatusRepository(id);
}
