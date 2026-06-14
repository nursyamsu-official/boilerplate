import {
  emailSettingCountRepository,
  emailSettingGetByIdRepository,
} from "../repositories/email-setting-create.repository";
import { emailSettingDeleteRepository } from "../repositories/email-setting-delete.repository";

export async function emailSettingDeleteService(id: string) {
  const setting = await emailSettingGetByIdRepository(id);
  if (!setting) {
    throw new Error("Email setting not found");
  }

  if (setting.isDefault) {
    const total = await emailSettingCountRepository();
    if (total <= 1) {
      throw new Error("Cannot delete the only email setting");
    }
    throw new Error("Cannot delete the default email setting. Set another default first.");
  }

  return emailSettingDeleteRepository(id);
}
