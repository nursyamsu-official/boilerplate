import type { ProductTypeDetail, ProductTypeFormValues } from "../types/product-type.type";

export const defaultProductTypeFormValues: ProductTypeFormValues = {
  code: "",
  name: "",
  description: null,
  isActive: true,
};

export function mapProductTypeDetailToFormValues(
  detail: ProductTypeDetail,
): ProductTypeFormValues {
  return {
    code: detail.code,
    name: detail.name,
    description: detail.description,
    isActive: detail.isActive,
  };
}
