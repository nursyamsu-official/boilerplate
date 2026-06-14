import type {
  EmailSettingDetail,
  EmailSettingFormValues,
} from "../types/email-setting.type";

export const defaultEmailSettingFormValues: EmailSettingFormValues = {
  name: "",
  provider: "SMTP",
  host: "",
  port: 587,
  username: "",
  password: "",
  apiKey: "",
  fromEmail: "",
  fromName: "",
  replyTo: "",
  useTls: true,
  isActive: true,
  isDefault: false,
};

export function mapEmailSettingDetailToFormValues(
  detail: EmailSettingDetail,
): EmailSettingFormValues {
  return {
    name: detail.name,
    provider: detail.provider,
    host: detail.host ?? "",
    port: detail.port,
    username: detail.username ?? "",
    password: "",
    apiKey: "",
    fromEmail: detail.fromEmail,
    fromName: detail.fromName ?? "",
    replyTo: detail.replyTo ?? "",
    useTls: detail.useTls,
    isActive: detail.isActive,
    isDefault: detail.isDefault,
  };
}
