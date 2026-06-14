import { prisma } from "@/lib/prisma";

import type { WebhookCreateInput } from "../schemas/webhook-create.schema";

export async function webhookGetByIdRepository(id: string) {
  return prisma.webhook.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      url: true,
      events: true,
      description: true,
      headers: true,
      userId: true,
      isActive: true,
      maxRetries: true,
      timeoutMs: true,
      secret: true,
    },
  });
}

export async function webhookCreateRepository(input: WebhookCreateInput) {
  return prisma.webhook.create({
    data: input,
    select: {
      id: true,
      name: true,
      url: true,
      isActive: true,
      createdAt: true,
    },
  });
}
