import { webhookGetByIdRepository } from "../repositories/webhook-create.repository";
import type { WebhookDetail } from "../types/webhook.type";

export async function webhookGetByIdService(id: string): Promise<WebhookDetail> {
  const webhook = await webhookGetByIdRepository(id);
  if (!webhook) {
    throw new Error("Webhook not found");
  }

  const { secret, ...rest } = webhook;

  return {
    ...rest,
    hasSecret: Boolean(secret),
  };
}
