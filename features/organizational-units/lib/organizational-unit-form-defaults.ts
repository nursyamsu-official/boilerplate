import type {
  OrganizationalUnitDetail,
  OrganizationalUnitFormValues,
} from "../types/organizational-unit.type";

export const defaultOrganizationalUnitFormValues: OrganizationalUnitFormValues =
  {
    companyId: "",
    code: "",
    name: "",
    description: null,
    parentId: null,
    sortOrder: 0,
    isActive: true,
  };

export function mapOrganizationalUnitDetailToFormValues(
  detail: OrganizationalUnitDetail,
): OrganizationalUnitFormValues {
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
