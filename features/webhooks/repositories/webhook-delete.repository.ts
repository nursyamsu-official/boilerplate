import { prisma } from "@/lib/prisma";

export async function webhookDeleteRepository(id: string) {
  return prisma.webhook.delete({
    where: { id },
    select: { id: true },
  });
}
