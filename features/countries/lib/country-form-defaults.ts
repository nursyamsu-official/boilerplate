import type { CountryDetail, CountryFormValues } from "../types/country.type";

export const defaultCountryFormValues: CountryFormValues = {
  code: "",
  name: "",
  description: null,
  isActive: true,
};

export function mapCountryDetailToFormValues(
  detail: CountryDetail,
): CountryFormValues {
  return {
    code: detail.code,
    name: detail.name,
    description: detail.description,
    isActive: detail.isActive,
  };
}
