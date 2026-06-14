import type { EmailTemplateFilterInput } from "../schemas/email-template-filter.schema";

export type EmailTemplateTableRow = {
  id: string;
  code: string;
  name: string;
  subject: string;
  isActive: boolean;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type EmailTemplateListResult = {
  items: EmailTemplateTableRow[];
  total: number;
  page: number;
  pageSize: number;
};

export type EmailTemplateDetail = {
  id: string;
  code: string;
  name: string;
  subject: string;
  bodyHtml: string;
  bodyText: string | null;
  variables: string | null;
  description: string | null;
  isActive: boolean;
  isSystem: boolean;
};

export type EmailTemplateFormValues = {
  code: string;
  name: string;
  subject: string;
  bodyHtml: string;
  bodyText: string;
  variables: string;
  description: string;
  isActive: boolean;
};

export type EmailTemplateListFilters = EmailTemplateFilterInput;
