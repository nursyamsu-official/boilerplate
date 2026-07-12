import type {
  PurchasingGroupPreviewItem,
  PurchasingGroupTreeNode,
} from "../types/purchasing-group.type";

function sortPurchasingGroupNodes(nodes: PurchasingGroupTreeNode[]): void {
  nodes.sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
  );

  for (const node of nodes) {
    sortPurchasingGroupNodes(node.children);
  }
}

export function buildPurchasingGroupTree(
  flatItems: PurchasingGroupPreviewItem[],
): PurchasingGroupTreeNode[] {
  const nodesById = new Map<string, PurchasingGroupTreeNode>();

  for (const item of flatItems) {
    nodesById.set(item.id, { ...item, children: [] });
  }

  const roots: PurchasingGroupTreeNode[] = [];

  for (const item of flatItems) {
    const node = nodesById.get(item.id);
    if (!node) continue;

    if (item.parentId && nodesById.has(item.parentId)) {
      nodesById.get(item.parentId)?.children.push(node);
      continue;
    }

    roots.push(node);
  }

  sortPurchasingGroupNodes(roots);
  return roots;
}

export type PurchasingGroupCompanyPreviewGroup = {
  companyId: string;
  companyName: string;
  tree: PurchasingGroupTreeNode[];
};

export function groupPurchasingGroupPreviewByCompany(
  items: PurchasingGroupPreviewItem[],
): PurchasingGroupCompanyPreviewGroup[] {
  const itemsByCompany = new Map<string, PurchasingGroupPreviewItem[]>();

  for (const item of items) {
    const companyItems = itemsByCompany.get(item.companyId) ?? [];
    companyItems.push(item);
    itemsByCompany.set(item.companyId, companyItems);
  }

  return [...itemsByCompany.entries()]
    .map(([companyId, companyItems]) => ({
      companyId,
      companyName: companyItems[0]?.companyName ?? "",
      tree: buildPurchasingGroupTree(companyItems),
    }))
    .sort((a, b) => a.companyName.localeCompare(b.companyName));
}
