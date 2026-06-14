import type { WebhookFilterInput } from "../schemas/webhook-filter.schema";

export type WebhookDeliveryStatusValue =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "RETRYING";

export type WebhookTableRow = {
  id: string;
  name: string;
  url: string;
  events: string;
  isActive: boolean;
  failureCount: number;
  lastDeliveryStatus: WebhookDeliveryStatusValue | null;
  lastDeliveryAt: Date | null;
  user: { id: string; name: string; email: string } | null;
  createdAt: Date;
  updatedAt: Date;
};

export type WebhookListResult = {
  items: WebhookTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type WebhookDetail = {
  id: string;
  name: string;
  url: string;
  events: string;
  description: string | null;
  headers: string | null;
  userId: string | null;
  isActive: boolean;
  maxRetries: number;
  timeoutMs: number;
  hasSecret: boolean;
};

export type WebhookFormValues = {
  name: string;
  url: string;
  events: string;
  secret: string;
  description: string;
  headers: string;
  userId: string;
  isActive: boolean;
  maxRetries: number;
  timeoutMs: number;
};

export type WebhookListFilters = WebhookFilterInput;
