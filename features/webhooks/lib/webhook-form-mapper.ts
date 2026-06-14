import type { WebhookFormValues } from "../types/webhook.type";

export function mapFormValuesToWebhookCreateInput(values: WebhookFormValues) {
  return values;
}

export function mapFormValuesToWebhookUpdateInput(
  id: string,
  values: WebhookFormValues,
) {
  return { id, ...values };
}
