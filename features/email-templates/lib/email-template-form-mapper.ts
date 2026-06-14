import type { EmailTemplateCreateInput } from "../schemas/email-template-create.schema";
import type { EmailTemplateFormValues } from "../types/email-template.type";

export function mapFormValuesToEmailTemplateCreateInput(
  values: EmailTemplateFormValues,
): EmailTemplateCreateInput {
  return {
    code: values.code,
    name: values.name,
    subject: values.subject,
    bodyHtml: values.bodyHtml,
    bodyText: values.bodyText || null,
    variables: values.variables || null,
    description: values.description || null,
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
