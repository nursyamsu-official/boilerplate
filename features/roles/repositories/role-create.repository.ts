import { prisma } from "@/lib/prisma";

import type { RoleCreateInput } from "../schemas/role-create.schema";

export async function roleCreateRepository(input: RoleCreateInput) {
  return prisma.$transaction(async (tx) => {
    const role = await tx.role.create({
      data: {
        code: input.code,
        name: input.name,
        description: input.description,
        isActive: input.isActive,
      },
      select: { id: true, code: true, name: true },
    });

    if (input.permissionIds.length > 0) {
      await tx.rolePermission.createMany({
        data: input.permissionIds.map((permissionId) => ({
          roleId: role.id,
          permissionId,
          granted: true,
        })),
      });
    }

    return role;
  });
}

export async function roleGetByCodeRepository(code: string) {
  return prisma.role.findUnique({
    where: { code },
    select: { id: true },
  });
}

export async function roleGetByIdRepository(id: string) {
  return prisma.role.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      isActive: true,
      isSystem: true,
      rolePermissions: {
        select: { permissionId: true },
      },
    },
  });
}
