import { menuActivePathsRepository } from "../repositories/menu-active-paths.repository";

export async function getActiveMenuPaths(): Promise<string[]> {
  return menuActivePathsRepository();
}
