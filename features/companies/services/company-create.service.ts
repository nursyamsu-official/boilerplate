import {
  companyCreateRepository,
  companyGetByCodeRepository,
} from "../repositories/company-create.repository";
import type { CompanyCreateInput } from "../schemas/company-create.schema";

export async function companyCreateService(input: CompanyCreateInput) {
  const existing = await companyGetByCodeRepository(input.code);
  if (existing) {
    throw new Error("Company code already exists");
  }

  return companyCreateRepository(input);
}
