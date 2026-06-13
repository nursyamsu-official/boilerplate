import type { PermissionCreateInput } from "../schemas/permission-create.schema";
import type { PermissionFormValues } from "../types/permission.type";

export function mapFormValuesToPermissionCreateInput(
  values: PermissionFormValues,
): PermissionCreateInput {
  return {
    code: values.code,
    name: values.name,
    description: values.description,
    moduleId: values.moduleId,
  };
}

export function mapFormValuesToPermissionUpdateInput(
  id: string,
  values: PermissionFormValues,
) {
  return {
    id,
    ...mapFormValuesToPermissionCreateInput(values),
  };
}
