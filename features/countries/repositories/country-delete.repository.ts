import { prisma } from "@/lib/prisma";

export async function countryDeleteRepository(id: string) {
  return prisma.country.delete({
    where: { id },
    select: { id: true },
  });
}
