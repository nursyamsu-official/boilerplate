import { prisma } from "@/lib/prisma";

export async function userDeleteRepository(id: string) {
  return prisma.user.delete({
    where: { id },
    select: { id: true },
  });
}
