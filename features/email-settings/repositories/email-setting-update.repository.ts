import { prisma } from "@/lib/prisma";

import type { EmailSettingUpdateInput } from "../schemas/email-setting-create.schema";

export async function emailSettingUpdateRepository(
  input: EmailSettingUpdateInput & {
    password?: string | null;
    apiKey?: string | null;
  },
) {
  return prisma.emailSetting.update({
    where: { id: input.id },
    data: {
      name: input.name,
      provider: input.provider,
      host: input.host,
      port: input.port,
      username: input.username,
      ...(input.password !== undefined ? { password: input.password } : {}),
      ...(input.apiKey !== undefined ? { apiKey: input.apiKey } : {}),
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

export async function emailSettingToggleStatusRepository(id: string) {
  const setting = await prisma.emailSetting.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!setting) return null;

  return prisma.emailSetting.update({
    where: { id },
    data: { isActive: !setting.isActive },
    select: { id: true, isActive: true },
  });
}

export async function emailSettingSetDefaultRepository(id: string) {
  return prisma.$transaction([
    prisma.emailSetting.updateMany({
      where: { isDefault: true, id: { not: id } },
      data: { isDefault: false },
    }),
    prisma.emailSetting.update({
      where: { id },
      data: { isDefault: true, isActive: true },
      select: { id: true, isDefault: true },
    }),
  ]);
}
