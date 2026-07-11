import { buildMenuTree } from "@/features/menus/lib/menu-tree";

import { userMenuListRepository } from "../repositories/user-menu-list.repository";
import type { NavigationMenuTreeNode } from "../types/navigation.type";

export async function getUserNavigationMenuTree(
  userId: string,
): Promise<NavigationMenuTreeNode[]> {
  const items = await userMenuListRepository(userId);
  return buildMenuTree(items);
}
