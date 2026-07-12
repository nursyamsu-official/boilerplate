import { logisticUnitGetByIdRepository } from "../repositories/logistic-unit-create.repository";
import { logisticUnitGetDescendantIdsRepository } from "../repositories/logistic-unit-get-descendant-ids.repository";
import { logisticUnitParentOptionsRepository } from "../repositories/logistic-unit-parent-options.repository";
import type {
  LogisticUnitDetail,
  LogisticUnitParentOption,
} from "../types/logistic-unit.type";

export async function logisticUnitGetByIdService(
  id: string,
): Promise<LogisticUnitDetail> {
  const unit = await logisticUnitGetByIdRepository(id);
  if (!unit) {
    throw new Error("Logistic Unit not found");
  }

  return unit;
}

export async function logisticUnitGetParentOptionsService(
  companyId: string,
  excludeUnitId?: string,
): Promise<LogisticUnitParentOption[]> {
  const options = await logisticUnitParentOptionsRepository(companyId);

  if (!excludeUnitId) {
    return options;
  }

  const descendantIds =
    await logisticUnitGetDescendantIdsRepository(excludeUnitId);
  const excludedIds = new Set([excludeUnitId, ...descendantIds]);

  return options.filter((option) => !excludedIds.has(option.id));
}
