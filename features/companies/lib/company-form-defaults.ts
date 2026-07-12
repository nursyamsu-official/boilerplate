import type {
  CompanyDetail,
  CompanyFormValues,
} from "../types/company.type";

export const defaultCompanyFormValues: CompanyFormValues = {
  code: "",
  name: "",
  description: null,
  isActive: true,
};

export function mapCompanyDetailToFormValues(
  detail: CompanyDetail,
): CompanyFormValues {
  return {
    code: detail.code,
    name: detail.name,
    description: detail.description,
    isActive: detail.isActive,
  };
}
