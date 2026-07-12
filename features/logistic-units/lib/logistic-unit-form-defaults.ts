import type {
  LogisticUnitDetail,
  LogisticUnitFormValues,
} from "../types/logistic-unit.type";

export const defaultLogisticUnitFormValues: LogisticUnitFormValues =
  {
    companyId: "",
    code: "",
    name: "",
    description: null,
    parentId: null,
    sortOrder: 0,
    isActive: true,
  };

export function mapLogisticUnitDetailToFormValues(
  detail: LogisticUnitDetail,
): LogisticUnitFormValues {
  return {
    companyId: detail.companyId,
    code: detail.code,
    name: detail.name,
    description: detail.description,
    parentId: detail.parentId,
    sortOrder: detail.sortOrder,
    isActive: detail.isActive,
  };
}
