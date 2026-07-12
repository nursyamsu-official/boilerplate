import type { DistrictCreateInput } from "../schemas/district-create.schema";
import type { DistrictFormValues } from "../types/district.type";

export function mapFormValuesToDistrictCreateInput(
  values: DistrictFormValues,
): DistrictCreateInput {
  return {
    provinceId: values.provinceId,
    code: values.code,
    name: values.name,
    description: values.description,
    isActive: values.isActive,
  };
}

export function mapFormValuesToDistrictUpdateInput(
  id: string,
  values: DistrictFormValues,
) {
  return {
    id,
    ...mapFormValuesToDistrictCreateInput(values),
  };
}
