import { prisma } from "@/lib/prisma";

import type { SsoUserUpdateInput } from "../schemas/sso-user-create.schema";

export async function ssoUserUpdateRepository(input: SsoUserUpdateInput) {
  const { id, ...rest } = input;

  return prisma.ssoUserLink.update({
    where: { id },
    data: rest,
    select: {
      id: true,
      externalId: true,
      updatedAt: true,
    },
  });
}
