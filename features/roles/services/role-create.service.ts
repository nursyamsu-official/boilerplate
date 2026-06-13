import {
  roleCreateRepository,
  roleGetByCodeRepository,
} from "../repositories/role-create.repository";
import type { RoleCreateInput } from "../schemas/role-create.schema";

export async function roleCreateService(input: RoleCreateInput) {
  const existing = await roleGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Role code already exists");
  }

  return roleCreateRepository(input);
}
