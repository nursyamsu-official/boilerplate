import {
  purchasingGroupCountChildrenRepository,
  purchasingGroupDeleteRepository,
} from "../repositories/purchasing-group-delete.repository";
import { purchasingGroupGetByIdRepository } from "../repositories/purchasing-group-create.repository";

export async function purchasingGroupDeleteService(id: string) {
  const existing = await purchasingGroupGetByIdRepository(id);
  if (!existing) {
    throw new Error("Purchasing Group not found");
  }

  const childCount = await purchasingGroupCountChildrenRepository(id);
  if (childCount > 0) {
    throw new Error("Cannot delete Purchasing Group with child units");
  }

  return purchasingGroupDeleteRepository(id);
}
