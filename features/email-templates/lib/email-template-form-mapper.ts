import type { EmailTemplateFormValues } from "../types/email-template.type";

export function mapFormValuesToEmailTemplateCreateInput(
  values: EmailTemplateFormValues,
): EmailTemplateFormValues {
  return {
    code: values.code,
    name: values.name,
    subject: values.subject,
    bodyHtml: values.bodyHtml,
    bodyText: values.bodyText,
    variables: values.variables,
    description: values.description,
    isActive: values.isActive,
  };
}

export function mapFormValuesToEmailTemplateUpdateInput(
  id: string,
  values: EmailTemplateFormValues,
) {
  return {
    id,
    ...mapFormValuesToEmailTemplateCreateInput(values),
  };
}
