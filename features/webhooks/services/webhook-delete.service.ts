import { webhookDeleteRepository } from "../repositories/webhook-delete.repository";
import { webhookGetByIdRepository } from "../repositories/webhook-create.repository";

export async function webhookDeleteService(id: string) {
  const existing = await webhookGetByIdRepository(id);
  if (!existing) {
    throw new Error("Webhook not found");
  }

  return webhookDeleteRepository(id);
}
