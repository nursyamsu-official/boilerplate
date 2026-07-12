import {
  logisticUnitCountChildrenRepository,
  logisticUnitDeleteRepository,
} from "../repositories/logistic-unit-delete.repository";
import { logisticUnitGetByIdRepository } from "../repositories/logistic-unit-create.repository";

export async function logisticUnitDeleteService(id: string) {
  const existing = await logisticUnitGetByIdRepository(id);
  if (!existing) {
    throw new Error("Logistic Unit not found");
  }

  const childCount = await logisticUnitCountChildrenRepository(id);
  if (childCount > 0) {
    throw new Error("Cannot delete Logistic Unit with child units");
  }

  return logisticUnitDeleteRepository(id);
}
