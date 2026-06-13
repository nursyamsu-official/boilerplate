import { prisma } from "@/lib/prisma";

import type { PermissionModuleCreateInput } from "../schemas/permission-module-create.schema";

export async function permissionModuleCreateRepository(
  input: PermissionModuleCreateInput,
) {
  return prisma.permissionModule.create({
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      icon: input.icon,
      sortOrder: input.sortOrder,
      isActive: input.isActive,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function permissionModuleGetByCodeRepository(code: string) {
  return prisma.permissionModule.findUnique({
    where: { code },
    select: { id: true },
  });
}

export async function permissionModuleGetByIdRepository(id: string) {
  return prisma.permissionModule.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      icon: true,
      sortOrder: true,
      isActive: true,
      isSystem: true,
      _count: { select: { permissions: true } },
    },
  });
}

export async function permissionModuleCountPermissionsRepository(id: string) {
  return prisma.permission.count({
    where: { moduleId: id },
  });
}
