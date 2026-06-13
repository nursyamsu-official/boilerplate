import type { UserStatus } from "../types/user.type";

import { prisma } from "@/lib/prisma";

export async function userSetStatusRepository(
  id: string,
  status: UserStatus,
  actorId: string,
) {
  const shouldRevokeSessions =
    status === "INACTIVE" || status === "BANNED";

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: { id },
      data: {
        status,
        ...(shouldRevokeSessions
          ? {
              deactivatedAt: new Date(),
              deactivatedBy: actorId,
            }
          : {
              deactivatedAt: null,
              deactivatedBy: null,
            }),
      },
      select: { id: true, status: true },
    });

    if (shouldRevokeSessions) {
      await tx.session.deleteMany({
        where: { userId: id },
      });
    }

    return user;
  });
}
