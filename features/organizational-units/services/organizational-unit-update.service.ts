import { companyGetByIdRepository } from "@/features/companies/repositories/company-create.repository";

import {
  organizationalUnitGetByCodeRepository,
  organizationalUnitGetByIdRepository,
} from "../repositories/organizational-unit-create.repository";
import { organizationalUnitGetDescendantIdsRepository } from "../repositories/organizational-unit-get-descendant-ids.repository";
import {
  organizationalUnitToggleStatusRepository,
  organizationalUnitUpdateRepository,
} from "../repositories/organizational-unit-update.repository";
import type { OrganizationalUnitUpdateInput } from "../schemas/organizational-unit-create.schema";

async function assertActiveCompany(companyId: string) {
  const company = await companyGetByIdRepository(companyId);
  if (!company) {
    throw new Error("Company not found");
  }

  if (!company.isActive) {
    throw new Error("Company is inactive");
  }
}

async function assertValidParent(
  companyId: string,
  parentId: string | null,
  unitId: string,
) {
  if (!parentId) {
    return;
  }

  if (parentId === unitId) {
    throw new Error("An organizational unit cannot be its own parent");
  }

  const parent = await organizationalUnitGetByIdRepository(parentId);
  if (!parent) {
    throw new Error("Parent organizational unit not found");
  }

  if (parent.companyId !== companyId) {
    throw new Error("Parent must belong to the same company");
  }

  const descendantIds = await organizationalUnitGetDescendantIdsRepository(unitId);
  if (descendantIds.includes(parentId)) {
    throw new Error(
      "An organizational unit cannot be nested under its own descendant",
    );
  }
}

export async function organizationalUnitUpdateService(
  input: OrganizationalUnitUpdateInput,
) {
  const existing = await organizationalUnitGetByIdRepository(input.id);
  if (!existing) {
    throw new Error("Organizational unit not found");
  }

  await assertActiveCompany(input.companyId);

  const duplicateCode = await organizationalUnitGetByCodeRepository(
    input.companyId,
    input.code,
    input.id,
  );
  if (duplicateCode) {
    throw new Error("Organizational unit code already exists for this company");
  }

  await assertValidParent(input.companyId, input.parentId ?? null, input.id);

  return organizationalUnitUpdateRepository(input);
}

export async function organizationalUnitToggleStatusService(id: string) {
  const existing = await organizationalUnitGetByIdRepository(id);
  if (!existing) {
    throw new Error("Organizational unit not found");
  }

  return organizationalUnitToggleStatusRepository(id, !existing.isActive);
}
