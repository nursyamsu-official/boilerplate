import type { ProductGroupDetail, ProductGroupFormValues } from "../types/product-group.type";

export const defaultProductGroupFormValues: ProductGroupFormValues = {
  code: "",
  name: "",
  description: null,
  isActive: true,
};

export function mapProductGroupDetailToFormValues(
  detail: ProductGroupDetail,
): ProductGroupFormValues {
  return {
    code: detail.code,
    name: detail.name,
    description: detail.description,
    isActive: detail.isActive,
  };
}
