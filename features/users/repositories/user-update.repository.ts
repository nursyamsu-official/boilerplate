import { prisma } from "@/lib/prisma";

import type { UserUpdateInput } from "../schemas/user-create.schema";

export async function userGetByIdRepository(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      phoneNumber: true,
      status: true,
      userRoles: {
        select: { roleId: true },
      },
    },
  });
}

export async function userUpdateRepository(
  input: UserUpdateInput,
  assignedBy: string,
) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: { id: input.id },
      data: {
        name: input.name,
        email: input.email,
        username: input.username,
        phoneNumber: input.phoneNumber,
        status: input.status,
      },
      select: { id: true, name: true, email: true },
    });

    await tx.userRole.deleteMany({
      where: { userId: input.id },
    });

    if (input.roleIds.length > 0) {
      await tx.userRole.createMany({
        data: input.roleIds.map((roleId) => ({
          userId: input.id,
          roleId,
          assignedBy,
        })),
      });
    }

    return user;
  });
}
