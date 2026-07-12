import { companyGetByIdRepository } from "../repositories/company-create.repository";
import type { CompanyDetail } from "../types/company.type";

export async function companyGetByIdService(
  id: string,
): Promise<CompanyDetail> {
  const company = await companyGetByIdRepository(id);
  if (!company) {
    throw new Error("Company not found");
  }

  return {
    id: company.id,
    code: company.code,
    name: company.name,
    description: company.description,
    isActive: company.isActive,
  };
}
