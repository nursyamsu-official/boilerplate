import { companyListRepository } from "../repositories/company-list.repository";
import type { CompanyListFilters } from "../types/company.type";

export async function companyGetListService(filters: CompanyListFilters) {
  return companyListRepository(filters);
}
