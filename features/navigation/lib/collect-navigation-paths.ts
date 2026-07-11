import type { NavigationMenuTreeNode } from "../types/navigation.type";

export function collectNavigationPaths(
  nodes: NavigationMenuTreeNode[],
): string[] {
  const paths: string[] = [];

  for (const node of nodes) {
    if (node.path) {
      paths.push(node.path);
    }

    if (node.children.length > 0) {
      paths.push(...collectNavigationPaths(node.children));
    }
  }

  return paths;
}
