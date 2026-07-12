import { companyGetByIdRepository } from "@/features/companies/repositories/company-create.repository";

import {
  logisticUnitCreateRepository,
  logisticUnitGetByCodeRepository,
  logisticUnitGetByIdRepository,
} from "../repositories/logistic-unit-create.repository";
import type { LogisticUnitCreateInput } from "../schemas/logistic-unit-create.schema";

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
    throw new Error("An Logistic Unit cannot be its own parent");
  }

  const parent = await logisticUnitGetByIdRepository(parentId);
  if (!parent) {
    throw new Error("Parent Logistic Unit not found");
  }

  if (parent.companyId !== companyId) {
    throw new Error("Parent must belong to the same company");
  }
}

export async function logisticUnitCreateService(
  input: LogisticUnitCreateInput,
) {
  await assertActiveCompany(input.companyId);

  const existing = await logisticUnitGetByCodeRepository(
    input.companyId,
    input.code,
  );
  if (existing) {
    throw new Error("Logistic Unit code already exists for this company");
  }

  await assertValidParent(input.companyId, input.parentId);

  return logisticUnitCreateRepository(input);
}
