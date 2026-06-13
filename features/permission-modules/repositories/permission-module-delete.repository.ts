import { prisma } from "@/lib/prisma";

export async function permissionModuleDeleteRepository(id: string) {
  return prisma.permissionModule.delete({
    where: { id },
    select: { id: true },
  });
}
