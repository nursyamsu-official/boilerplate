import type { UomGlobalConversionFormValues } from "../types/uom-global-conversion.type";

export const defaultUomGlobalConversionFormValues: UomGlobalConversionFormValues =
  {
    fromUomId: "",
    toUomId: "",
    conversionFactor: 1,
    description: null,
    isActive: true,
  };

export function mapUomGlobalConversionDetailToFormValues(detail: {
  fromUomId: string;
  toUomId: string;
  conversionFactor: number;
  description: string | null;
  isActive: boolean;
}): UomGlobalConversionFormValues {
  return {
    fromUomId: detail.fromUomId,
    toUomId: detail.toUomId,
    conversionFactor: detail.conversionFactor,
    description: detail.description,
    isActive: detail.isActive,
  };
}
