import {
  menuGetByCodeRepository,
  menuGetByIdRepository,
  menuGetDescendantIdsRepository,
} from "../repositories/menu-get-by-id.repository";
import {
  menuToggleStatusRepository,
  menuUpdateRepository,
} from "../repositories/menu-update.repository";
import type { MenuUpdateInput } from "../schemas/menu-update.schema";

async function assertValidParent(
  parentId: string | null,
  menuId: string,
) {
  if (!parentId) {
    return;
  }

  if (parentId === menuId) {
    throw new Error("A menu cannot be its own parent");
  }

  const parent = await menuGetByIdRepository(parentId);
  if (!parent) {
    throw new Error("Parent menu not found");
  }

  const descendantIds = await menuGetDescendantIdsRepository(menuId);
  if (descendantIds.includes(parentId)) {
    throw new Error("A menu cannot be nested under its own descendant");
  }
}

export async function menuUpdateService(input: MenuUpdateInput) {
  const existing = await menuGetByIdRepository(input.id);
  if (!existing) {
    throw new Error("Menu not found");
  }

  const duplicateCode = await menuGetByCodeRepository(input.code, input.id);
  if (duplicateCode) {
    throw new Error("Menu code already exists");
  }

  await assertValidParent(input.parentId ?? null, input.id);

  return menuUpdateRepository(input);
}

export async function menuToggleStatusService(id: string) {
  const existing = await menuGetByIdRepository(id);
  if (!existing) {
    throw new Error("Menu not found");
  }

  return menuToggleStatusRepository(id, !existing.isActive);
}
