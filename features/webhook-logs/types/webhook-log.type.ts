import type { WebhookLogFilterInput } from "../schemas/webhook-log-filter.schema";

export type WebhookLogStatusValue =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "RETRYING";

export type WebhookLogTableRow = {
  id: string;
  webhookId: string;
  event: string;
  payload: string;
  requestHeaders: string | null;
  responseStatus: number | null;
  responseBody: string | null;
  status: WebhookLogStatusValue;
  attempts: number;
  error: string | null;
  nextRetryAt: Date | null;
  deliveredAt: Date | null;
  createdAt: Date;
  webhook: {
    id: string;
    name: string;
    url: string;
  };
};

export type WebhookLogListResult = {
  items: WebhookLogTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type WebhookLogListFilters = WebhookLogFilterInput;
