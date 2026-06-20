import type { WebhookDetail, WebhookFormValues } from "../types/webhook.type";

export const defaultWebhookFormValues: WebhookFormValues = {
  name: "",
  url: "",
  events: "",
  secret: "",
  description: "",
  headers: "",
  userId: null,
  isActive: true,
  maxRetries: 3,
  timeoutMs: 10000,
};

export function formatEventsForForm(events: string): string {
  try {
    const parsed = JSON.parse(events) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.join(", ");
    }
  } catch {
    return events;
  }

  return events;
}

export function mapWebhookDetailToFormValues(
  detail: WebhookDetail,
): WebhookFormValues {
  return {
    name: detail.name,
    url: detail.url,
    events: formatEventsForForm(detail.events),
    secret: "",
    description: detail.description ?? "",
    headers: detail.headers ?? "",
    userId: detail.userId,
    isActive: detail.isActive,
    maxRetries: detail.maxRetries,
    timeoutMs: detail.timeoutMs,
  };
}
