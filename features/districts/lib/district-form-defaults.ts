import type { DistrictDetail, DistrictFormValues } from "../types/district.type";

export const defaultDistrictFormValues: DistrictFormValues = {
  countryId: "",
  provinceId: "",
  code: "",
  name: "",
  description: null,
  isActive: true,
};

export function mapDistrictDetailToFormValues(
  detail: DistrictDetail,
): DistrictFormValues {
  return {
    countryId: detail.countryId,
    provinceId: detail.provinceId,
    code: detail.code,
    name: detail.name,
    description: detail.description,
    isActive: detail.isActive,
  };
}
