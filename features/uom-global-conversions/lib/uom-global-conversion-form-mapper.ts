import type { UomGlobalConversionCreateInput } from "../schemas/uom-global-conversion-create.schema";
import type { UomGlobalConversionFormValues } from "../types/uom-global-conversion.type";

export function mapFormValuesToUomGlobalConversionCreateInput(
  values: UomGlobalConversionFormValues,
): UomGlobalConversionCreateInput {
  return {
    fromUomId: values.fromUomId,
    toUomId: values.toUomId,
    conversionFactor: values.conversionFactor,
    description: values.description,
    isActive: values.isActive,
  };
}

export function mapFormValuesToUomGlobalConversionUpdateInput(
  id: string,
  values: UomGlobalConversionFormValues,
) {
  return {
    id,
    ...mapFormValuesToUomGlobalConversionCreateInput(values),
  };
}
