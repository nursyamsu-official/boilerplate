import { webhookOptionsRepository } from "../repositories/webhook-options.repository";

export async function webhookOptionsService() {
  return webhookOptionsRepository();
}

export type { WebhookOption } from "../repositories/webhook-options.repository";
