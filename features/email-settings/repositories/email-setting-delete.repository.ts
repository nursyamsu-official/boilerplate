import { prisma } from "@/lib/prisma";

export async function emailSettingDeleteRepository(id: string) {
  return prisma.emailSetting.delete({
    where: { id },
    select: { id: true },
  });
}
