import {
  menuGetByIdRepository,
  menuGetDescendantIdsRepository,
} from "../repositories/menu-get-by-id.repository";
import { menuParentOptionsRepository } from "../repositories/menu-parent-options.repository";
import type { MenuDetail, MenuParentOption } from "../types/menu.type";

export async function menuGetByIdService(id: string): Promise<MenuDetail> {
  const menu = await menuGetByIdRepository(id);
  if (!menu) {
    throw new Error("Menu not found");
  }

  return menu;
}

export async function menuGetParentOptionsService(
  excludeMenuId?: string,
): Promise<MenuParentOption[]> {
  const options = await menuParentOptionsRepository();

  if (!excludeMenuId) {
    return options;
  }

  const descendantIds = await menuGetDescendantIdsRepository(excludeMenuId);
  const excludedIds = new Set([excludeMenuId, ...descendantIds]);

  return options.filter((option) => !excludedIds.has(option.id));
}
