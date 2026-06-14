import type { EmailLogFilterInput } from "../schemas/email-log-filter.schema";

export type EmailLogStatus =
  | "PENDING"
  | "SENT"
  | "FAILED"
  | "BOUNCED";

export type EmailLogTableRow = {
  id: string;
  templateId: string | null;
  toEmail: string;
  ccEmail: string | null;
  bccEmail: string | null;
  subject: string;
  bodyHtml: string | null;
  status: EmailLogStatus;
  error: string | null;
  attempts: number;
  sentAt: Date | null;
  createdAt: Date;
  template: {
    code: string;
    name: string;
  } | null;
};

export type EmailLogListResult = {
  items: EmailLogTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type EmailLogListFilters = EmailLogFilterInput;
