import { prisma } from "@/lib/prisma";

import type { SsoProviderUpdateInput } from "../schemas/sso-provider-create.schema";

export async function ssoProviderUpdateRepository(
  input: Omit<SsoProviderUpdateInput, "clientSecret"> & {
    clientSecret?: string;
  },
) {
  const { id, clientSecret, ...rest } = input;

  return prisma.ssoProvider.update({
    where: { id },
    data: {
      ...rest,
      ...(clientSecret ? { clientSecret } : {}),
    },
    select: {
      id: true,
      code: true,
      name: true,
      isActive: true,
      updatedAt: true,
    },
  });
}

export async function ssoProviderToggleStatusRepository(id: string) {
  const provider = await prisma.ssoProvider.findUnique({
    where: { id },
    select: { isActive: true },
  });

  if (!provider) return null;

  return prisma.ssoProvider.update({
    where: { id },
    data: { isActive: !provider.isActive },
    select: {
      id: true,
      isActive: true,
    },
  });
}
