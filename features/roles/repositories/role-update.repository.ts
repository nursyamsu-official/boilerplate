import { prisma } from "@/lib/prisma";

import type { RoleUpdateInput } from "../schemas/role-create.schema";

export async function roleUpdateRepository(input: RoleUpdateInput) {
  return prisma.$transaction(async (tx) => {
    const role = await tx.role.update({
      where: { id: input.id },
      data: {
        code: input.code,
        name: input.name,
        description: input.description,
        isActive: input.isActive,
      },
      select: { id: true, code: true, name: true },
    });

    await tx.rolePermission.deleteMany({
      where: { roleId: input.id },
    });

    if (input.permissionIds.length > 0) {
      await tx.rolePermission.createMany({
        data: input.permissionIds.map((permissionId) => ({
          roleId: input.id,
          permissionId,
          granted: true,
        })),
      });
    }

    return role;
  });
}

export async function roleToggleStatusRepository(id: string) {
  const current = await prisma.role.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!current) return null;

  return prisma.role.update({
    where: { id },
    data: { isActive: !current.isActive },
    select: { id: true, isActive: true },
  });
}
