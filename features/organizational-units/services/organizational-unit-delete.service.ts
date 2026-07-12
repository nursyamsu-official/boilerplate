import {
  organizationalUnitCountChildrenRepository,
  organizationalUnitDeleteRepository,
} from "../repositories/organizational-unit-delete.repository";
import { organizationalUnitGetByIdRepository } from "../repositories/organizational-unit-create.repository";

export async function organizationalUnitDeleteService(id: string) {
  const existing = await organizationalUnitGetByIdRepository(id);
  if (!existing) {
    throw new Error("Organizational unit not found");
  }

  const childCount = await organizationalUnitCountChildrenRepository(id);
  if (childCount > 0) {
    throw new Error("Cannot delete organizational unit with child units");
  }

  return organizationalUnitDeleteRepository(id);
}
