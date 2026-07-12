import {
  companyCountOrganizationalUnitsRepository,
  companyGetByIdRepository,
} from "../repositories/company-create.repository";
import { companyDeleteRepository } from "../repositories/company-delete.repository";

export async function companyDeleteService(id: string) {
  const company = await companyGetByIdRepository(id);
  if (!company) {
    throw new Error("Company not found");
  }

  const unitCount = await companyCountOrganizationalUnitsRepository(id);
  if (unitCount > 0) {
    throw new Error("Cannot delete company with organizational units");
  }

  return companyDeleteRepository(id);
}
