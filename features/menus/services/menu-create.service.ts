import { menuCreateRepository } from "../repositories/menu-create.repository";
import {
  menuGetByCodeRepository,
  menuGetByIdRepository,
} from "../repositories/menu-get-by-id.repository";
import type { MenuCreateInput } from "../schemas/menu-create.schema";

async function assertValidParent(parentId: string | null, menuId?: string) {
  if (!parentId) {
    return;
  }

  if (menuId && parentId === menuId) {
    throw new Error("A menu cannot be its own parent");
  }

  const parent = await menuGetByIdRepository(parentId);
  if (!parent) {
    throw new Error("Parent menu not found");
  }
}

export async function menuCreateService(input: MenuCreateInput) {
  const existing = await menuGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Menu code already exists");
  }

  await assertValidParent(input.parentId);

  return menuCreateRepository(input);
}
