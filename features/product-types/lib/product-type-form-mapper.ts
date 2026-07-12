import type { ProductTypeCreateInput } from "../schemas/product-type-create.schema";
import type { ProductTypeFormValues } from "../types/product-type.type";

export function mapFormValuesToProductTypeCreateInput(
  values: ProductTypeFormValues,
): ProductTypeCreateInput {
  return {
    code: values.code,
    name: values.name,
    description: values.description,
    isActive: values.isActive,
  };
}

export function mapFormValuesToProductTypeUpdateInput(
  id: string,
  values: ProductTypeFormValues,
) {
  return {
    id,
    ...mapFormValuesToProductTypeCreateInput(values),
  };
}
