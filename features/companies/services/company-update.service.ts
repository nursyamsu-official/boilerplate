import {
  companyGetByCodeRepository,
  companyGetByIdRepository,
} from "../repositories/company-create.repository";
import {
  companyToggleStatusRepository,
  companyUpdateRepository,
} from "../repositories/company-update.repository";
import type { CompanyUpdateInput } from "../schemas/company-create.schema";

export async function companyUpdateService(input: CompanyUpdateInput) {
  const company = await companyGetByIdRepository(input.id);
  if (!company) {
    throw new Error("Company not found");
  }

  const existing = await companyGetByCodeRepository(input.code, input.id);
  if (existing) {
    throw new Error("Company code already exists");
  }

  return companyUpdateRepository(input);
}

export async function companyToggleStatusService(id: string) {
  const company = await companyGetByIdRepository(id);
  if (!company) {
    throw new Error("Company not found");
  }

  return companyToggleStatusRepository(id);
}
