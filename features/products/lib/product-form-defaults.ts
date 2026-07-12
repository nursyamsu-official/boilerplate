import type { ProductDetail, ProductFormValues } from "../types/product.type";

export const defaultProductFormValues: ProductFormValues = {
  code: "",
  name: "",
  description: null,
  productTypeId: "",
  productGroupId: "",
  productCategoryId: "",
  baseUomId: null,
  isActive: true,
};

export function mapProductDetailToFormValues(detail: ProductDetail): ProductFormValues {
  return {
    code: detail.code,
    name: detail.name,
    description: detail.description,
    productTypeId: detail.productTypeId,
    productGroupId: detail.productGroupId,
    productCategoryId: detail.productCategoryId,
    baseUomId: detail.baseUomId,
    isActive: detail.isActive,
  };
}

export function getDefaultProductCategoryId(
  groupId: string,
  categoryOptions: { id: string; groupId: string }[],
): string {
  return categoryOptions.find((option) => option.groupId === groupId)?.id ?? "";
}
