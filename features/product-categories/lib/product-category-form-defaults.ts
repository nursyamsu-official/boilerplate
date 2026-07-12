import type { ProductCategoryDetail, ProductCategoryFormValues } from "../types/product-category.type";

export const defaultProductCategoryFormValues: ProductCategoryFormValues = {
  groupId: "",
  code: "",
  name: "",
  description: null,
  isActive: true,
};

export function mapProductCategoryDetailToFormValues(
  detail: ProductCategoryDetail,
): ProductCategoryFormValues {
  return {
    groupId: detail.groupId,
    code: detail.code,
    name: detail.name,
    description: detail.description,
    isActive: detail.isActive,
  };
}
