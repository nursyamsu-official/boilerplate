import {
  companyCountLogisticUnitsRepository,
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

  const logisticUnitCount = await companyCountLogisticUnitsRepository(id);
  if (logisticUnitCount > 0) {
    throw new Error("Cannot delete company with logistic units");
  }

  return companyDeleteRepository(id);
}
