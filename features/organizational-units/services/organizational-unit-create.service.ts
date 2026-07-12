import { companyGetByIdRepository } from "@/features/companies/repositories/company-create.repository";

import {
  organizationalUnitCreateRepository,
  organizationalUnitGetByCodeRepository,
  organizationalUnitGetByIdRepository,
} from "../repositories/organizational-unit-create.repository";
import type { OrganizationalUnitCreateInput } from "../schemas/organizational-unit-create.schema";

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
  unitId?: string,
) {
  if (!parentId) {
    return;
  }

  if (unitId && parentId === unitId) {
    throw new Error("An organizational unit cannot be its own parent");
  }

  const parent = await organizationalUnitGetByIdRepository(parentId);
  if (!parent) {
    throw new Error("Parent organizational unit not found");
  }

  if (parent.companyId !== companyId) {
    throw new Error("Parent must belong to the same company");
  }
}

export async function organizationalUnitCreateService(
  input: OrganizationalUnitCreateInput,
) {
  await assertActiveCompany(input.companyId);

  const existing = await organizationalUnitGetByCodeRepository(
    input.companyId,
    input.code,
  );
  if (existing) {
    throw new Error("Organizational unit code already exists for this company");
  }

  await assertValidParent(input.companyId, input.parentId);

  return organizationalUnitCreateRepository(input);
}
