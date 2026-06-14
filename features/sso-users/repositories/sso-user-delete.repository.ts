import { prisma } from "@/lib/prisma";

export async function ssoUserDeleteRepository(id: string) {
  return prisma.ssoUserLink.delete({
    where: { id },
    select: { id: true },
  });
}
