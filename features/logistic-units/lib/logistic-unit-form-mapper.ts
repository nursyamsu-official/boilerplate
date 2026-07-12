import type { LogisticUnitCreateInput } from "../schemas/logistic-unit-create.schema";
import type { LogisticUnitFormValues } from "../types/logistic-unit.type";

export function mapFormValuesToLogisticUnitCreateInput(
  values: LogisticUnitFormValues,
): LogisticUnitCreateInput {
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

export function mapFormValuesToLogisticUnitUpdateInput(
  id: string,
  values: LogisticUnitFormValues,
) {
  return {
    id,
    ...mapFormValuesToLogisticUnitCreateInput(values),
  };
}
