import { canAccessMenuPath } from "../lib/can-access-menu-path";
import { collectNavigationPaths } from "../lib/collect-navigation-paths";
import { getActiveMenuPaths } from "./menu-active-paths.service";
import { getUserNavigationMenuTree } from "./user-menu-get-tree.service";

export async function userCanAccessPath(
  userId: string,
  pathname: string,
): Promise<boolean> {
  const menuTree = await getUserNavigationMenuTree(userId);
  const allowedPaths = collectNavigationPaths(menuTree);
  const allMenuPaths = await getActiveMenuPaths();

  return canAccessMenuPath(pathname, allowedPaths, allMenuPaths);
}
