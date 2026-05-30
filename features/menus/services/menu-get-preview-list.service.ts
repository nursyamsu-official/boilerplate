import { menuPreviewListRepository } from "../repositories/menu-preview-list.repository";
import type { MenuPreviewItem } from "../types/menu.type";

export async function menuGetPreviewListService(): Promise<MenuPreviewItem[]> {
  return menuPreviewListRepository();
}
