import { prisma } from "@/lib/prisma";

import type { SsoProviderCreateInput } from "../schemas/sso-provider-create.schema";

export async function ssoProviderGetByIdRepository(id: string) {
  return prisma.ssoProvider.findUnique({
    where: { id },
    select: {
      id: true,
      code: true,
      name: true,
      protocol: true,
      clientId: true,
      clientSecret: true,
      issuerUrl: true,
      authUrl: true,
      tokenUrl: true,
      userinfoUrl: true,
      callbackUrl: true,
      scopes: true,
      metadata: true,
      isActive: true,
      autoProvision: true,
      defaultRoleId: true,
    },
  });
}

export async function ssoProviderGetByCodeRepository(code: string) {
  return prisma.ssoProvider.findUnique({
    where: { code },
    select: { id: true },
  });
}

export async function ssoProviderCreateRepository(input: SsoProviderCreateInput) {
  return prisma.ssoProvider.create({
    data: input,
    select: {
      id: true,
      code: true,
      name: true,
      isActive: true,
      createdAt: true,
    },
  });
}

export async function ssoProviderOptionsRepository() {
  return prisma.ssoProvider.findMany({
    where: { isActive: true },
    select: {
      id: true,
      code: true,
      name: true,
    },
    orderBy: { name: "asc" },
  });
}
