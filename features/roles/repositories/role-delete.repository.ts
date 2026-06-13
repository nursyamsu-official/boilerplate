import { prisma } from "@/lib/prisma";

export async function roleDeleteRepository(id: string) {
  return prisma.role.delete({
    where: { id },
    select: { id: true },
  });
}
