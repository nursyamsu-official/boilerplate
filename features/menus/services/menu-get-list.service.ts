import { menuListRepository } from "../repositories/menu-list.repository";
import type { MenuListFilters, MenuListResult } from "../types/menu.type";

export async function menuGetListService(
  filters: MenuListFilters,
): Promise<MenuListResult> {
  return menuListRepository(filters);
}
