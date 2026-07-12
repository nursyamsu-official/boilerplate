import { companyGetByIdRepository } from "@/features/companies/repositories/company-create.repository";

import {
  purchasingGroupGetByCodeRepository,
  purchasingGroupGetByIdRepository,
} from "../repositories/purchasing-group-create.repository";
import { purchasingGroupGetDescendantIdsRepository } from "../repositories/purchasing-group-get-descendant-ids.repository";
import {
  purchasingGroupToggleStatusRepository,
  purchasingGroupUpdateRepository,
} from "../repositories/purchasing-group-update.repository";
import type { PurchasingGroupUpdateInput } from "../schemas/purchasing-group-create.schema";

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
    throw new Error("A purchasing group cannot be its own parent");
  }

  const parent = await purchasingGroupGetByIdRepository(parentId);
  if (!parent) {
    throw new Error("Parent Purchasing Group not found");
  }

  if (parent.companyId !== companyId) {
    throw new Error("Parent must belong to the same company");
  }

  const descendantIds = await purchasingGroupGetDescendantIdsRepository(unitId);
  if (descendantIds.includes(parentId)) {
    throw new Error(
      "A purchasing group cannot be nested under its own descendant",
    );
  }
}

export async function purchasingGroupUpdateService(
  input: PurchasingGroupUpdateInput,
) {
  const existing = await purchasingGroupGetByIdRepository(input.id);
  if (!existing) {
    throw new Error("Purchasing Group not found");
  }

  await assertActiveCompany(input.companyId);

  const duplicateCode = await purchasingGroupGetByCodeRepository(
    input.companyId,
    input.code,
    input.id,
  );
  if (duplicateCode) {
    throw new Error("Purchasing Group code already exists for this company");
  }

  await assertValidParent(input.companyId, input.parentId ?? null, input.id);

  return purchasingGroupUpdateRepository(input);
}

export async function purchasingGroupToggleStatusService(id: string) {
  const existing = await purchasingGroupGetByIdRepository(id);
  if (!existing) {
    throw new Error("Purchasing Group not found");
  }

  return purchasingGroupToggleStatusRepository(id, !existing.isActive);
}
