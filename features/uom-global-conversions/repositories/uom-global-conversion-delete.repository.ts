import { prisma } from "@/lib/prisma";

export async function uomGlobalConversionDeleteRepository(id: string) {
  return prisma.uomGlobalConversion.delete({
    where: { id },
    select: { id: true },
  });
}
