import { prisma } from "@/lib/prisma";

import type { EmailSettingCreateInput } from "../schemas/email-setting-create.schema";

export async function emailSettingCreateRepository(
  input: EmailSettingCreateInput,
) {
  return prisma.emailSetting.create({
    data: {
      name: input.name,
      provider: input.provider,
      host: input.host,
      port: input.port,
      username: input.username,
      password: input.password,
      apiKey: input.apiKey,
      fromEmail: input.fromEmail,
      fromName: input.fromName,
      replyTo: input.replyTo,
      useTls: input.useTls,
      isActive: input.isActive,
      isDefault: input.isDefault,
    },
    select: { id: true, name: true },
  });
}

export async function emailSettingGetByIdRepository(id: string) {
  return prisma.emailSetting.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      provider: true,
      host: true,
      port: true,
      username: true,
      password: true,
      apiKey: true,
      fromEmail: true,
      fromName: true,
      replyTo: true,
      useTls: true,
      isActive: true,
      isDefault: true,
    },
  });
}

export async function emailSettingCountRepository() {
  return prisma.emailSetting.count();
}

export async function emailSettingClearDefaultRepository(
  excludeId?: string,
) {
  return prisma.emailSetting.updateMany({
    where: {
      isDefault: true,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    data: { isDefault: false },
  });
}
