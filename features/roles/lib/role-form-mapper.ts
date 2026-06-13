import type { RoleCreateInput } from "../schemas/role-create.schema";
import type { RoleFormValues } from "../types/role.type";

export function mapFormValuesToRoleCreateInput(
  values: RoleFormValues,
): RoleCreateInput {
  return {
    code: values.code,
    name: values.name,
    description: values.description,
    isActive: values.isActive,
    permissionIds: values.permissionIds,
  };
}

export function mapFormValuesToRoleUpdateInput(
  id: string,
  values: RoleFormValues,
) {
  return {
    id,
    ...mapFormValuesToRoleCreateInput(values),
  };
}
