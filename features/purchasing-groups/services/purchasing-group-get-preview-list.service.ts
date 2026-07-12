import { purchasingGroupPreviewListRepository } from "../repositories/purchasing-group-preview-list.repository";
import type { PurchasingGroupPreviewItem } from "../types/purchasing-group.type";

export async function purchasingGroupGetPreviewListService(): Promise<
  PurchasingGroupPreviewItem[]
> {
  return purchasingGroupPreviewListRepository();
}
