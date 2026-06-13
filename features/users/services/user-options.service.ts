import { prisma } from "@/lib/prisma";

import type { UserOption } from "../types/user.type";

export async function userOptionsService(): Promise<UserOption[]> {
  return prisma.user.findMany({
    where: { status: "ACTIVE" },
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: { name: "asc" },
  });
}

export type { UserOption } from "../types/user.type";
