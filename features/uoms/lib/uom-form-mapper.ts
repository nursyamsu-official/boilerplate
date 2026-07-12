import type { UomCreateInput } from "../schemas/uom-create.schema";
import type { UomFormValues } from "../types/uom.type";

export function mapFormValuesToUomCreateInput(
  values: UomFormValues,
): UomCreateInput {
  return {
    code: values.code,
    name: values.name,
    symbol: values.symbol,
    description: values.description,
    uomType: values.uomType,
    decimalPlaces: values.decimalPlaces,
    isActive: values.isActive,
  };
}

export function mapFormValuesToUomUpdateInput(id: string, values: UomFormValues) {
  return {
    id,
    ...mapFormValuesToUomCreateInput(values),
  };
}
