import type {
  LogisticUnitPreviewItem,
  LogisticUnitTreeNode,
} from "../types/logistic-unit.type";

function sortLogisticUnitNodes(nodes: LogisticUnitTreeNode[]): void {
  nodes.sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
  );

  for (const node of nodes) {
    sortLogisticUnitNodes(node.children);
  }
}

export function buildLogisticUnitTree(
  flatItems: LogisticUnitPreviewItem[],
): LogisticUnitTreeNode[] {
  const nodesById = new Map<string, LogisticUnitTreeNode>();

  for (const item of flatItems) {
    nodesById.set(item.id, { ...item, children: [] });
  }

  const roots: LogisticUnitTreeNode[] = [];

  for (const item of flatItems) {
    const node = nodesById.get(item.id);
    if (!node) continue;

    if (item.parentId && nodesById.has(item.parentId)) {
      nodesById.get(item.parentId)?.children.push(node);
      continue;
    }

    roots.push(node);
  }

  sortLogisticUnitNodes(roots);
  return roots;
}

export type LogisticUnitCompanyPreviewGroup = {
  companyId: string;
  companyName: string;
  tree: LogisticUnitTreeNode[];
};

export function groupLogisticUnitPreviewByCompany(
  items: LogisticUnitPreviewItem[],
): LogisticUnitCompanyPreviewGroup[] {
  const itemsByCompany = new Map<string, LogisticUnitPreviewItem[]>();

  for (const item of items) {
    const companyItems = itemsByCompany.get(item.companyId) ?? [];
    companyItems.push(item);
    itemsByCompany.set(item.companyId, companyItems);
  }

  return [...itemsByCompany.entries()]
    .map(([companyId, companyItems]) => ({
      companyId,
      companyName: companyItems[0]?.companyName ?? "",
      tree: buildLogisticUnitTree(companyItems),
    }))
    .sort((a, b) => a.companyName.localeCompare(b.companyName));
}
