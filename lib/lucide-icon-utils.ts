export function kebabToPascal(kebab: string): string {
  return kebab
    .split("-")
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join("");
}

export function pascalToKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

export function filterIconNames(
  options: readonly string[],
  query: string,
  limit = 50,
): string[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return options.slice(0, limit);
  }

  return options
    .filter((iconName) => iconName.toLowerCase().includes(normalizedQuery))
    .slice(0, limit);
}

export function getIconPickerItems(
  options: readonly string[],
  query: string,
  selectedValue: string | null,
  limit = 50,
): string[] {
  const filtered = filterIconNames(options, query, limit);

  if (selectedValue && !filtered.includes(selectedValue)) {
    return [selectedValue, ...filtered].slice(0, limit + 1);
  }

  return filtered;
}
