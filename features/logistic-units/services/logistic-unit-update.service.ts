import { companyGetByIdRepository } from "@/features/companies/repositories/company-create.repository";

import {
  logisticUnitGetByCodeRepository,
  logisticUnitGetByIdRepository,
} from "../repositories/logistic-unit-create.repository";
import { logisticUnitGetDescendantIdsRepository } from "../repositories/logistic-unit-get-descendant-ids.repository";
import {
  logisticUnitToggleStatusRepository,
  logisticUnitUpdateRepository,
} from "../repositories/logistic-unit-update.repository";
import type { LogisticUnitUpdateInput } from "../schemas/logistic-unit-create.schema";

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
    throw new Error("An Logistic Unit cannot be its own parent");
  }

  const parent = await logisticUnitGetByIdRepository(parentId);
  if (!parent) {
    throw new Error("Parent Logistic Unit not found");
  }

  if (parent.companyId !== companyId) {
    throw new Error("Parent must belong to the same company");
  }

  const descendantIds = await logisticUnitGetDescendantIdsRepository(unitId);
  if (descendantIds.includes(parentId)) {
    throw new Error(
      "An Logistic Unit cannot be nested under its own descendant",
    );
  }
}

export async function logisticUnitUpdateService(
  input: LogisticUnitUpdateInput,
) {
  const existing = await logisticUnitGetByIdRepository(input.id);
  if (!existing) {
    throw new Error("Logistic Unit not found");
  }

  await assertActiveCompany(input.companyId);

  const duplicateCode = await logisticUnitGetByCodeRepository(
    input.companyId,
    input.code,
    input.id,
  );
  if (duplicateCode) {
    throw new Error("Logistic Unit code already exists for this company");
  }

  await assertValidParent(input.companyId, input.parentId ?? null, input.id);

  return logisticUnitUpdateRepository(input);
}

export async function logisticUnitToggleStatusService(id: string) {
  const existing = await logisticUnitGetByIdRepository(id);
  if (!existing) {
    throw new Error("Logistic Unit not found");
  }

  return logisticUnitToggleStatusRepository(id, !existing.isActive);
}
