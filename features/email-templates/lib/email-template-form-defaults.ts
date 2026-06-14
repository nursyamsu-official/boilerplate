import type {
  EmailTemplateDetail,
  EmailTemplateFormValues,
} from "../types/email-template.type";

export const defaultEmailTemplateFormValues: EmailTemplateFormValues = {
  code: "",
  name: "",
  subject: "",
  bodyHtml: "",
  bodyText: "",
  variables: "",
  description: "",
  isActive: true,
};

export function mapEmailTemplateDetailToFormValues(
  detail: EmailTemplateDetail,
): EmailTemplateFormValues {
  return {
    code: detail.code,
    name: detail.name,
    subject: detail.subject,
    bodyHtml: detail.bodyHtml,
    bodyText: detail.bodyText ?? "",
    variables: detail.variables ?? "",
    description: detail.description ?? "",
    isActive: detail.isActive,
  };
}
