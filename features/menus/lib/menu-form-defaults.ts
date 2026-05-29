import type { MenuDetail, MenuFormValues } from "../types/menu.type";

export const defaultMenuFormValues: MenuFormValues = {
  code: "",
  label: "",
  path: null,
  icon: null,
  parentId: null,
  sortOrder: 0,
  isActive: true,
};

export function mapMenuDetailToFormValues(menu: MenuDetail): MenuFormValues {
  return {
    code: menu.code,
    label: menu.label,
    path: menu.path,
    icon: menu.icon,
    parentId: menu.parentId,
    sortOrder: menu.sortOrder,
    isActive: menu.isActive,
  };
}
