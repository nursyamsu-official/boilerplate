import type { EmailSettingFilterInput } from "../schemas/email-setting-filter.schema";

export type EmailProviderValue =
  | "SMTP"
  | "SENDGRID"
  | "MAILGUN"
  | "SES"
  | "RESEND"
  | "POSTMARK";

export type EmailSettingTableRow = {
  id: string;
  name: string;
  provider: EmailProviderValue;
  fromEmail: string;
  fromName: string | null;
  isActive: boolean;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type EmailSettingListResult = {
  items: EmailSettingTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type EmailSettingDetail = {
  id: string;
  name: string;
  provider: EmailProviderValue;
  host: string | null;
  port: number | null;
  username: string | null;
  fromEmail: string;
  fromName: string | null;
  replyTo: string | null;
  useTls: boolean;
  isActive: boolean;
  isDefault: boolean;
  hasPassword: boolean;
  hasApiKey: boolean;
};

export type EmailSettingFormValues = {
  name: string;
  provider: EmailProviderValue;
  host: string;
  port: number | null;
  username: string;
  password: string;
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyTo: string;
  useTls: boolean;
  isActive: boolean;
  isDefault: boolean;
};

export type EmailSettingListFilters = EmailSettingFilterInput;
