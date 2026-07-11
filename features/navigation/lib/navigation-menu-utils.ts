import type { NavigationMenuTreeNode } from "../types/navigation.type";

export function findNavigationPathLabels(
  nodes: NavigationMenuTreeNode[],
  pathname: string,
): string[] {
  for (const node of nodes) {
    if (node.path === pathname) {
      return [node.label];
    }

    if (node.children.length > 0) {
      const childLabels = findNavigationPathLabels(node.children, pathname);
      if (childLabels.length > 0) {
        return [node.label, ...childLabels];
      }
    }
  }

  return [];
}

export function isNavigationNodeActive(
  node: NavigationMenuTreeNode,
  pathname: string,
): boolean {
  if (node.path === pathname) {
    return true;
  }

  return node.children.some((child) => isNavigationNodeActive(child, pathname));
}
