import { webhookGetByIdRepository } from "../repositories/webhook-create.repository";
import {
  webhookToggleStatusRepository,
  webhookUpdateRepository,
} from "../repositories/webhook-update.repository";
import type { WebhookUpdateInput } from "../schemas/webhook-create.schema";

export async function webhookUpdateService(input: WebhookUpdateInput) {
  const existing = await webhookGetByIdRepository(input.id);
  if (!existing) {
    throw new Error("Webhook not found");
  }

  const { secret, ...rest } = input;

  return webhookUpdateRepository({
    ...rest,
    ...(secret ? { secret } : {}),
  });
}

export async function webhookToggleStatusService(id: string) {
  const result = await webhookToggleStatusRepository(id);
  if (!result) {
    throw new Error("Webhook not found");
  }

  return result;
}
