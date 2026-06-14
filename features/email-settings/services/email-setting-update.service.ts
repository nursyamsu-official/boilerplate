import {
  emailSettingClearDefaultRepository,
  emailSettingGetByIdRepository,
} from "../repositories/email-setting-create.repository";
import {
  emailSettingSetDefaultRepository,
  emailSettingToggleStatusRepository,
  emailSettingUpdateRepository,
} from "../repositories/email-setting-update.repository";
import type { EmailSettingUpdateInput } from "../schemas/email-setting-create.schema";

export async function emailSettingUpdateService(
  input: EmailSettingUpdateInput,
) {
  const existing = await emailSettingGetByIdRepository(input.id);
  if (!existing) {
    throw new Error("Email setting not found");
  }

  if (input.isDefault) {
    await emailSettingClearDefaultRepository(input.id);
  }

  const updatePayload: EmailSettingUpdateInput & {
    password?: string | null;
    apiKey?: string | null;
  } = { ...input };

  if (input.password) {
    updatePayload.password = input.password;
  } else {
    delete updatePayload.password;
  }

  if (input.apiKey) {
    updatePayload.apiKey = input.apiKey;
  } else {
    delete updatePayload.apiKey;
  }

  return emailSettingUpdateRepository(updatePayload);
}

export async function emailSettingToggleStatusService(id: string) {
  const setting = await emailSettingGetByIdRepository(id);
  if (!setting) {
    throw new Error("Email setting not found");
  }

  const result = await emailSettingToggleStatusRepository(id);
  if (!result) {
    throw new Error("Email setting not found");
  }

  return result;
}

export async function emailSettingSetDefaultService(id: string) {
  const setting = await emailSettingGetByIdRepository(id);
  if (!setting) {
    throw new Error("Email setting not found");
  }

  return emailSettingSetDefaultRepository(id);
}
