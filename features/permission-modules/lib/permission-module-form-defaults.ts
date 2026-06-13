import type {
  PermissionModuleDetail,
  PermissionModuleFormValues,
} from "../types/permission-module.type";

export const defaultPermissionModuleFormValues: PermissionModuleFormValues = {
  code: "",
  name: "",
  description: null,
  icon: null,
  sortOrder: 0,
  isActive: true,
};

export function mapPermissionModuleDetailToFormValues(
  detail: PermissionModuleDetail,
): PermissionModuleFormValues {
  return {
    code: detail.code,
    name: detail.name,
    description: detail.description,
    icon: detail.icon,
    sortOrder: detail.sortOrder,
    isActive: detail.isActive,
  };
}
