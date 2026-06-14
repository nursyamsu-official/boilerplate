import { prisma } from "@/lib/prisma";

export type WebhookOption = {
  id: string;
  name: string;
};

export async function webhookOptionsRepository(): Promise<WebhookOption[]> {
  return prisma.webhook.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });
}
