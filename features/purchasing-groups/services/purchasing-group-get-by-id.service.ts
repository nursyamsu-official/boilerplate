import { purchasingGroupGetByIdRepository } from "../repositories/purchasing-group-create.repository";
import { purchasingGroupGetDescendantIdsRepository } from "../repositories/purchasing-group-get-descendant-ids.repository";
import { purchasingGroupParentOptionsRepository } from "../repositories/purchasing-group-parent-options.repository";
import type {
  PurchasingGroupDetail,
  PurchasingGroupParentOption,
} from "../types/purchasing-group.type";

export async function purchasingGroupGetByIdService(
  id: string,
): Promise<PurchasingGroupDetail> {
  const unit = await purchasingGroupGetByIdRepository(id);
  if (!unit) {
    throw new Error("Purchasing Group not found");
  }

  return unit;
}

export async function purchasingGroupGetParentOptionsService(
  companyId: string,
  excludeUnitId?: string,
): Promise<PurchasingGroupParentOption[]> {
  const options = await purchasingGroupParentOptionsRepository(companyId);

  if (!excludeUnitId) {
    return options;
  }

  const descendantIds =
    await purchasingGroupGetDescendantIdsRepository(excludeUnitId);
  const excludedIds = new Set([excludeUnitId, ...descendantIds]);

  return options.filter((option) => !excludedIds.has(option.id));
}
