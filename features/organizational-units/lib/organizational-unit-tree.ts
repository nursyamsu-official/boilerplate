import type {
  OrganizationalUnitPreviewItem,
  OrganizationalUnitTreeNode,
} from "../types/organizational-unit.type";

function sortOrganizationalUnitNodes(nodes: OrganizationalUnitTreeNode[]): void {
  nodes.sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
  );

  for (const node of nodes) {
    sortOrganizationalUnitNodes(node.children);
  }
}

export function buildOrganizationalUnitTree(
  flatItems: OrganizationalUnitPreviewItem[],
): OrganizationalUnitTreeNode[] {
  const nodesById = new Map<string, OrganizationalUnitTreeNode>();

  for (const item of flatItems) {
    nodesById.set(item.id, { ...item, children: [] });
  }

  const roots: OrganizationalUnitTreeNode[] = [];

  for (const item of flatItems) {
    const node = nodesById.get(item.id);
    if (!node) continue;

    if (item.parentId && nodesById.has(item.parentId)) {
      nodesById.get(item.parentId)?.children.push(node);
      continue;
    }

    roots.push(node);
  }

  sortOrganizationalUnitNodes(roots);
  return roots;
}

export type OrganizationalUnitCompanyPreviewGroup = {
  companyId: string;
  companyName: string;
  tree: OrganizationalUnitTreeNode[];
};

export function groupOrganizationalUnitPreviewByCompany(
  items: OrganizationalUnitPreviewItem[],
): OrganizationalUnitCompanyPreviewGroup[] {
  const itemsByCompany = new Map<string, OrganizationalUnitPreviewItem[]>();

  for (const item of items) {
    const companyItems = itemsByCompany.get(item.companyId) ?? [];
    companyItems.push(item);
    itemsByCompany.set(item.companyId, companyItems);
  }

  return [...itemsByCompany.entries()]
    .map(([companyId, companyItems]) => ({
      companyId,
      companyName: companyItems[0]?.companyName ?? "",
      tree: buildOrganizationalUnitTree(companyItems),
    }))
    .sort((a, b) => a.companyName.localeCompare(b.companyName));
}
