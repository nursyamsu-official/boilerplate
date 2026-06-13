import type { RoleDetail, RoleFormValues } from "../types/role.type";

export const defaultRoleFormValues: RoleFormValues = {
  code: "",
  name: "",
  description: null,
  isActive: true,
  permissionIds: [],
};

export function mapRoleDetailToFormValues(detail: RoleDetail): RoleFormValues {
  return {
    code: detail.code,
    name: detail.name,
    description: detail.description,
    isActive: detail.isActive,
    permissionIds: detail.permissionIds,
  };
}
