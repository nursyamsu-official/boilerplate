import { prisma } from "@/lib/prisma";

import type { SsoUserCreateInput } from "../schemas/sso-user-create.schema";

export async function ssoUserGetByIdRepository(id: string) {
  return prisma.ssoUserLink.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      providerId: true,
      externalId: true,
      emailAtProvider: true,
      displayName: true,
      rawProfile: true,
    },
  });
}

export async function ssoUserFindByProviderExternalRepository(
  providerId: string,
  externalId: string,
) {
  return prisma.ssoUserLink.findUnique({
    where: {
      providerId_externalId: {
        providerId,
        externalId,
      },
    },
    select: { id: true },
  });
}

export async function ssoUserCreateRepository(input: SsoUserCreateInput) {
  return prisma.ssoUserLink.create({
    data: input,
    select: {
      id: true,
      externalId: true,
      createdAt: true,
    },
  });
}
