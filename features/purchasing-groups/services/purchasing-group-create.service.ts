import { companyGetByIdRepository } from "@/features/companies/repositories/company-create.repository";

import {
  purchasingGroupCreateRepository,
  purchasingGroupGetByCodeRepository,
  purchasingGroupGetByIdRepository,
} from "../repositories/purchasing-group-create.repository";
import type { PurchasingGroupCreateInput } from "../schemas/purchasing-group-create.schema";

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
    throw new Error("A purchasing group cannot be its own parent");
  }

  const parent = await purchasingGroupGetByIdRepository(parentId);
  if (!parent) {
    throw new Error("Parent Purchasing Group not found");
  }

  if (parent.companyId !== companyId) {
    throw new Error("Parent must belong to the same company");
  }
}

export async function purchasingGroupCreateService(
  input: PurchasingGroupCreateInput,
) {
  await assertActiveCompany(input.companyId);

  const existing = await purchasingGroupGetByCodeRepository(
    input.companyId,
    input.code,
  );
  if (existing) {
    throw new Error("Purchasing Group code already exists for this company");
  }

  await assertValidParent(input.companyId, input.parentId);

  return purchasingGroupCreateRepository(input);
}
