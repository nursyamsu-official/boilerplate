import type { CompanyCreateInput } from "../schemas/company-create.schema";
import type { CompanyFormValues } from "../types/company.type";

export function mapFormValuesToCompanyCreateInput(
  values: CompanyFormValues,
): CompanyCreateInput {
  return {
    code: values.code,
    name: values.name,
    description: values.description,
    isActive: values.isActive,
  };
}

export function mapFormValuesToCompanyUpdateInput(
  id: string,
  values: CompanyFormValues,
) {
  return {
    id,
    ...mapFormValuesToCompanyCreateInput(values),
  };
}
