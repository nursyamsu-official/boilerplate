import { organizationalUnitGetByIdRepository } from "../repositories/organizational-unit-create.repository";
import { organizationalUnitGetDescendantIdsRepository } from "../repositories/organizational-unit-get-descendant-ids.repository";
import { organizationalUnitParentOptionsRepository } from "../repositories/organizational-unit-parent-options.repository";
import type {
  OrganizationalUnitDetail,
  OrganizationalUnitParentOption,
} from "../types/organizational-unit.type";

export async function organizationalUnitGetByIdService(
  id: string,
): Promise<OrganizationalUnitDetail> {
  const unit = await organizationalUnitGetByIdRepository(id);
  if (!unit) {
    throw new Error("Organizational unit not found");
  }

  return unit;
}

export async function organizationalUnitGetParentOptionsService(
  companyId: string,
  excludeUnitId?: string,
): Promise<OrganizationalUnitParentOption[]> {
  const options = await organizationalUnitParentOptionsRepository(companyId);

  if (!excludeUnitId) {
    return options;
  }

  const descendantIds =
    await organizationalUnitGetDescendantIdsRepository(excludeUnitId);
  const excludedIds = new Set([excludeUnitId, ...descendantIds]);

  return options.filter((option) => !excludedIds.has(option.id));
}
