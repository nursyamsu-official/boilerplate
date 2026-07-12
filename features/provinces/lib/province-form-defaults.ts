import type { ProvinceDetail, ProvinceFormValues } from "../types/province.type";

export const defaultProvinceFormValues: ProvinceFormValues = {
  countryId: "",
  code: "",
  name: "",
  description: null,
  isActive: true,
};

export function mapProvinceDetailToFormValues(
  detail: ProvinceDetail,
): ProvinceFormValues {
  return {
    countryId: detail.countryId,
    code: detail.code,
    name: detail.name,
    description: detail.description,
    isActive: detail.isActive,
  };
}
