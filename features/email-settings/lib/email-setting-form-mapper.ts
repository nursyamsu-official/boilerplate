import type { EmailSettingCreateInput } from "../schemas/email-setting-create.schema";
import type { EmailSettingFormValues } from "../types/email-setting.type";

export function mapFormValuesToEmailSettingCreateInput(
  values: EmailSettingFormValues,
): EmailSettingCreateInput {
  return {
    name: values.name,
    provider: values.provider,
    host: values.host || null,
    port: values.port,
    username: values.username || null,
    password: values.password || null,
    apiKey: values.apiKey || null,
    fromEmail: values.fromEmail,
    fromName: values.fromName || null,
    replyTo: values.replyTo || null,
    useTls: values.useTls,
    isActive: values.isActive,
    isDefault: values.isDefault,
  };
}

export function mapFormValuesToEmailSettingUpdateInput(
  id: string,
  values: EmailSettingFormValues,
) {
  return {
    id,
    ...mapFormValuesToEmailSettingCreateInput(values),
  };
}
