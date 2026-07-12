import type { ProductGroupCreateInput } from "../schemas/product-group-create.schema";
import type { ProductGroupFormValues } from "../types/product-group.type";

export function mapFormValuesToProductGroupCreateInput(
  values: ProductGroupFormValues,
): ProductGroupCreateInput {
  return {
    code: values.code,
    name: values.name,
    description: values.description,
    isActive: values.isActive,
  };
}

export function mapFormValuesToProductGroupUpdateInput(
  id: string,
  values: ProductGroupFormValues,
) {
  return {
    id,
    ...mapFormValuesToProductGroupCreateInput(values),
  };
}
