import type { MenuPreviewItem, MenuTreeNode } from "../types/menu.type";

function sortMenuNodes(nodes: MenuTreeNode[]): void {
  nodes.sort(
    (a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label),
  );

  for (const node of nodes) {
    sortMenuNodes(node.children);
  }
}

export function buildMenuTree(flatItems: MenuPreviewItem[]): MenuTreeNode[] {
  const nodesById = new Map<string, MenuTreeNode>();

  for (const item of flatItems) {
    nodesById.set(item.id, { ...item, children: [] });
  }

  const roots: MenuTreeNode[] = [];

  for (const item of flatItems) {
    const node = nodesById.get(item.id);
    if (!node) continue;

    if (item.parentId && nodesById.has(item.parentId)) {
      nodesById.get(item.parentId)?.children.push(node);
      continue;
    }

    roots.push(node);
  }

  sortMenuNodes(roots);
  return roots;
}
