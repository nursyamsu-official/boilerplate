import type { PermissionModuleCreateInput } from "../schemas/permission-module-create.schema";
import type { PermissionModuleFormValues } from "../types/permission-module.type";

export function mapFormValuesToPermissionModuleCreateInput(
  values: PermissionModuleFormValues,
): PermissionModuleCreateInput {
  return {
    code: values.code,
    name: values.name,
    description: values.description,
    icon: values.icon,
    sortOrder: values.sortOrder,
    isActive: values.isActive,
  };
}

export function mapFormValuesToPermissionModuleUpdateInput(
  id: string,
  values: PermissionModuleFormValues,
) {
  return {
    id,
    ...mapFormValuesToPermissionModuleCreateInput(values),
  };
}
