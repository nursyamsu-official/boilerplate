import type { ProductCreateInput } from "../schemas/product-create.schema";
import type { ProductFormValues } from "../types/product.type";

export function mapFormValuesToProductCreateInput(
  values: ProductFormValues,
): ProductCreateInput {
  return {
    code: values.code,
    name: values.name,
    description: values.description,
    productTypeId: values.productTypeId,
    productGroupId: values.productGroupId,
    productCategoryId: values.productCategoryId,
    baseUomId: values.baseUomId,
    isActive: values.isActive,
  };
}

export function mapFormValuesToProductUpdateInput(id: string, values: ProductFormValues) {
  return {
    id,
    ...mapFormValuesToProductCreateInput(values),
  };
}
