import type { MenuCreateInput } from "../schemas/menu-create.schema";
import type { MenuUpdateInput } from "../schemas/menu-update.schema";
import type { MenuFormValues } from "../types/menu.type";

export function mapFormValuesToCreateInput(
  values: MenuFormValues,
): MenuCreateInput {
  return {
    code: values.code.trim(),
    label: values.label.trim(),
    path: values.path?.trim() || null,
    icon: values.icon?.trim() || null,
    parentId: values.parentId,
    sortOrder: values.sortOrder,
    isActive: values.isActive,
  };
}

export function mapFormValuesToUpdateInput(
  id: string,
  values: MenuFormValues,
): MenuUpdateInput {
  return {
    id,
    ...mapFormValuesToCreateInput(values),
  };
}
