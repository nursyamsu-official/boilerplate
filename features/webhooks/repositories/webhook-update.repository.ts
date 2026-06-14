import { prisma } from "@/lib/prisma";

import type { WebhookUpdateInput } from "../schemas/webhook-create.schema";

export async function webhookUpdateRepository(
  input: Omit<WebhookUpdateInput, "secret"> & { secret?: string },
) {
  const { id, secret, ...rest } = input;

  return prisma.webhook.update({
    where: { id },
    data: {
      ...rest,
      ...(secret ? { secret } : {}),
    },
    select: {
      id: true,
      name: true,
      url: true,
      isActive: true,
      updatedAt: true,
    },
  });
}

export async function webhookToggleStatusRepository(id: string) {
  const webhook = await prisma.webhook.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!webhook) return null;

  return prisma.webhook.update({
    where: { id },
    data: { isActive: !webhook.isActive },
    select: {
      id: true,
      isActive: true,
    },
  });
}
