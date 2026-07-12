import type {
  PurchasingGroupDetail,
  PurchasingGroupFormValues,
} from "../types/purchasing-group.type";

export const defaultPurchasingGroupFormValues: PurchasingGroupFormValues =
  {
    companyId: "",
    code: "",
    name: "",
    description: null,
    parentId: null,
    sortOrder: 0,
    isActive: true,
  };

export function mapPurchasingGroupDetailToFormValues(
  detail: PurchasingGroupDetail,
): PurchasingGroupFormValues {
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
