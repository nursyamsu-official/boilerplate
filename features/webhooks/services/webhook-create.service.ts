import { webhookCreateRepository } from "../repositories/webhook-create.repository";
import type { WebhookCreateInput } from "../schemas/webhook-create.schema";

export async function webhookCreateService(input: WebhookCreateInput) {
  return webhookCreateRepository(input);
}
