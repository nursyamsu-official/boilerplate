import type {
  PermissionDetail,
  PermissionFormValues,
} from "../types/permission.type";

export const defaultPermissionFormValues: PermissionFormValues = {
  code: "",
  name: "",
  description: null,
  moduleId: null,
};

export function mapPermissionDetailToFormValues(
  detail: PermissionDetail,
): PermissionFormValues {
  return {
    code: detail.code,
    name: detail.name,
    description: detail.description,
    moduleId: detail.moduleId,
  };
}
