import { prisma } from "@/lib/prisma";

import type { PermissionCreateInput } from "../schemas/permission-create.schema";

export async function permissionCreateRepository(input: PermissionCreateInput) {
  return prisma.permission.create({
    data: {
      code: input.code,
      name: input.name,
      description: input.description,
      moduleId: input.moduleId,
    },
    select: { id: true, code: true, name: true },
  });
}

export async function permissionGetByCodeRepository(code: string) {
  return prisma.permission.findUnique({
    where: { code },
    select: { id: true },
  });
}

export async function permissionGetByIdRepository(id: string) {
  return prisma.permission.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
      moduleId: true,
      isSystem: true,
    },
  });
}

export async function permissionModuleExistsRepository(id: string) {
  return prisma.permissionModule.findUnique({
    where: { id },
    select: { id: true },
  });
}
