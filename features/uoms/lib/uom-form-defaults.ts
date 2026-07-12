import type { UomDetail, UomFormValues } from "../types/uom.type";

export const defaultUomFormValues: UomFormValues = {
  code: "",
  name: "",
  symbol: null,
  description: null,
  uomType: "OTHER",
  decimalPlaces: 0,
  isActive: true,
};

export function mapUomDetailToFormValues(detail: UomDetail): UomFormValues {
  return {
    code: detail.code,
    name: detail.name,
    symbol: detail.symbol,
    description: detail.description,
    uomType: detail.uomType,
    decimalPlaces: detail.decimalPlaces,
    isActive: detail.isActive,
  };
}
