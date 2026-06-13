import { prisma } from "@/lib/prisma";

export async function permissionDeleteRepository(id: string) {
  return prisma.permission.delete({
    where: { id },
    select: { id: true },
  });
}
