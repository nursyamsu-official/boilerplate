import { prisma } from "@/lib/prisma";

import type { PermissionUpdateInput } from "../schemas/permission-create.schema";

export async function permissionUpdateRepository(input: PermissionUpdateInput) {
  return prisma.permission.update({
    where: { id: input.id },
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      moduleId: input.moduleId,
    },
    select: { id: true, code: true, name: true },
  });
}
