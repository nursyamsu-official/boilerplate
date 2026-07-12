import { logisticUnitPreviewListRepository } from "../repositories/logistic-unit-preview-list.repository";
import type { LogisticUnitPreviewItem } from "../types/logistic-unit.type";

export async function logisticUnitGetPreviewListService(): Promise<
  LogisticUnitPreviewItem[]
> {
  return logisticUnitPreviewListRepository();
}
