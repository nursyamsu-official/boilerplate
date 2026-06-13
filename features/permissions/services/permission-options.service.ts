import { prisma } from "@/lib/prisma";

import type { PermissionOptionGroup } from "../types/permission-options.type";

export async function permissionOptionsService(): Promise<PermissionOptionGroup[]> {
  const permissions = await prisma.permission.findMany({
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      module: {
        select: {
          id: true,
          name: true,
          sortOrder: true,
        },
      },
    },
    orderBy: [
      { module: { sortOrder: "asc" } },
      { module: { name: "asc" } },
      { name: "asc" },
    ],
  });

  const groupsMap = new Map<string, PermissionOptionGroup>();

  for (const permission of permissions) {
    const moduleId = permission.module?.id ?? null;
    const moduleName = permission.module?.name ?? "Uncategorized";
    const key = moduleId ?? "__uncategorized__";

    if (!groupsMap.has(key)) {
      groupsMap.set(key, {
        moduleId,
        moduleName,
        permissions: [],
      });
    }

    groupsMap.get(key)!.permissions.push({
      id: permission.id,
      code: permission.code,
      name: permission.name,
      description: permission.description,
    });
  }

  return Array.from(groupsMap.values());
}
