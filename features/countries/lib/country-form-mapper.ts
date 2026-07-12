import type { CountryCreateInput } from "../schemas/country-create.schema";
import type { CountryFormValues } from "../types/country.type";

export function mapFormValuesToCountryCreateInput(
  values: CountryFormValues,
): CountryCreateInput {
  return {
    code: values.code,
    name: values.name,
    description: values.description,
    isActive: values.isActive,
  };
}

export function mapFormValuesToCountryUpdateInput(
  id: string,
  values: CountryFormValues,
) {
  return {
    id,
    ...mapFormValuesToCountryCreateInput(values),
  };
}
