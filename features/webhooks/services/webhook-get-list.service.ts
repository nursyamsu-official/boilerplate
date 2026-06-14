import { webhookListRepository } from "../repositories/webhook-list.repository";
import type { WebhookListFilters } from "../types/webhook.type";

export async function webhookGetListService(filters: WebhookListFilters) {
  return webhookListRepository(filters);
}
