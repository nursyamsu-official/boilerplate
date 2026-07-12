import type { PurchasingGroupCreateInput } from "../schemas/purchasing-group-create.schema";
import type { PurchasingGroupFormValues } from "../types/purchasing-group.type";

export function mapFormValuesToPurchasingGroupCreateInput(
  values: PurchasingGroupFormValues,
): PurchasingGroupCreateInput {
  return {
    companyId: values.companyId,
    code: values.code,
    name: values.name,
    description: values.description,
    parentId: values.parentId,
    sortOrder: values.sortOrder,
    isActive: values.isActive,
  };
}

export function mapFormValuesToPurchasingGroupUpdateInput(
  id: string,
  values: PurchasingGroupFormValues,
) {
  return {
    id,
    ...mapFormValuesToPurchasingGroupCreateInput(values),
  };
}
