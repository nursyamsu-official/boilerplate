import { prisma } from "@/lib/prisma";

export async function provinceDeleteRepository(id: string) {
  return prisma.province.delete({
    where: { id },
    select: { id: true },
  });
}
