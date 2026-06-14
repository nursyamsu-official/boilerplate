import {
  emailSettingClearDefaultRepository,
  emailSettingCreateRepository,
} from "../repositories/email-setting-create.repository";
import type { EmailSettingCreateInput } from "../schemas/email-setting-create.schema";

export async function emailSettingCreateService(
  input: EmailSettingCreateInput,
) {
  if (input.isDefault) {
    await emailSettingClearDefaultRepository();
  }

  return emailSettingCreateRepository(input);
}
