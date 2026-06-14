import {
  emailSettingGetByIdRepository,
} from "../repositories/email-setting-create.repository";
import type { EmailSettingDetail } from "../types/email-setting.type";

export async function emailSettingGetByIdService(
  id: string,
): Promise<EmailSettingDetail> {
  const setting = await emailSettingGetByIdRepository(id);
  if (!setting) {
    throw new Error("Email setting not found");
  }

  return {
    id: setting.id,
    name: setting.name,
    provider: setting.provider,
    host: setting.host,
    port: setting.port,
    username: setting.username,
    fromEmail: setting.fromEmail,
    fromName: setting.fromName,
    replyTo: setting.replyTo,
    useTls: setting.useTls,
    isActive: setting.isActive,
    isDefault: setting.isDefault,
    hasPassword: Boolean(setting.password),
    hasApiKey: Boolean(setting.apiKey),
  };
}
