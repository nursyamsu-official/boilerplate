import { webhookLogListRepository } from "../repositories/webhook-log-list.repository";
import type { WebhookLogListFilters } from "../types/webhook-log.type";

export async function webhookLogGetListService(filters: WebhookLogListFilters) {
  return webhookLogListRepository(filters);
}
