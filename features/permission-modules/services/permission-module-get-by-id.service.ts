import { permissionModuleGetByIdRepository } from "../repositories/permission-module-create.repository";
import type { PermissionModuleDetail } from "../types/permission-module.type";

export async function permissionModuleGetByIdService(
  id: string,
): Promise<PermissionModuleDetail> {
  const module = await permissionModuleGetByIdRepository(id);
  if (!module) {
    throw new Error("Permission module not found");
  }

  return {
    id: module.id,
    code: module.code,
    name: module.name,
    description: module.description,
    icon: module.icon,
    sortOrder: module.sortOrder,
    isActive: module.isActive,
    isSystem: module.isSystem,
  };
}

export async function permissionModuleOptionsService() {
  const { prisma } = await import("@/lib/prisma");

  return prisma.permissionModule.findMany({
    where: { isActive: true },
    select: { id: true, code: true, name: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}
