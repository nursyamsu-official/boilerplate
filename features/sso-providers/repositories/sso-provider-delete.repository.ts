import { prisma } from "@/lib/prisma";

export async function ssoProviderDeleteRepository(id: string) {
  return prisma.ssoProvider.delete({
    where: { id },
    select: { id: true },
  });
}
