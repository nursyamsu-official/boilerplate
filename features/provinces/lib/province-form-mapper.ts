import type { ProvinceCreateInput } from "../schemas/province-create.schema";
import type { ProvinceFormValues } from "../types/province.type";

export function mapFormValuesToProvinceCreateInput(
  values: ProvinceFormValues,
): ProvinceCreateInput {
  return {
    countryId: values.countryId,
    code: values.code,
    name: values.name,
    description: values.description,
    isActive: values.isActive,
  };
}

export function mapFormValuesToProvinceUpdateInput(
  id: string,
  values: ProvinceFormValues,
) {
  return {
    id,
    ...mapFormValuesToProvinceCreateInput(values),
  };
}
