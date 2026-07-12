import type { ProductCategoryCreateInput } from "../schemas/product-category-create.schema";
import type { ProductCategoryFormValues } from "../types/product-category.type";

export function mapFormValuesToProductCategoryCreateInput(
  values: ProductCategoryFormValues,
): ProductCategoryCreateInput {
  return {
    groupId: values.groupId,
    code: values.code,
    name: values.name,
    description: values.description,
    isActive: values.isActive,
  };
}

export function mapFormValuesToProductCategoryUpdateInput(
  id: string,
  values: ProductCategoryFormValues,
) {
  return {
    id,
    ...mapFormValuesToProductCategoryCreateInput(values),
  };
}
