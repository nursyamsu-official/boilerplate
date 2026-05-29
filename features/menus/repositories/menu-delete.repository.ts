import { prisma } from "@/lib/prisma";

export async function menuDeleteRepository(id: string) {
  return prisma.menu.delete({
    where: { id },
    select: { id: true },
  });
}
