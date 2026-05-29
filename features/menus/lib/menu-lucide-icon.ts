import { MENU_LUCIDE_ICON_OPTIONS } from "../constants/menu-lucide-icons";

const MENU_LUCIDE_ICON_SET = new Set<string>(MENU_LUCIDE_ICON_OPTIONS);

export function isMenuLucideIconName(name: string): boolean {
  return MENU_LUCIDE_ICON_SET.has(name);
}

export function mergeMenuLucideIconOptions(
  selectedValue: string | null,
): readonly string[] {
  if (!selectedValue || isMenuLucideIconName(selectedValue)) {
    return MENU_LUCIDE_ICON_OPTIONS;
  }

  return [selectedValue, ...MENU_LUCIDE_ICON_OPTIONS];
}
