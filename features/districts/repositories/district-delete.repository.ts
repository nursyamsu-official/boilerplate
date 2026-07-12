import { prisma } from "@/lib/prisma";

export async function districtDeleteRepository(id: string) {
  return prisma.district.delete({
    where: { id },
    select: { id: true },
  });
}
