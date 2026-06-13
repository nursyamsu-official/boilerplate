import { prisma } from "@/lib/prisma";

import type { UserCreateInput } from "../schemas/user-create.schema";

export async function userGetByEmailRepository(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
}

export async function userGetByUsernameRepository(username: string) {
  return prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });
}

export async function userUpdateAfterSignupRepository(
  userId: string,
  input: Pick<UserCreateInput, "username" | "phoneNumber" | "status">,
  createdBy: string,
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      username: input.username,
      phoneNumber: input.phoneNumber,
      status: input.status,
      createdBy,
    },
    select: { id: true, name: true, email: true },
  });
}

export async function userAssignRolesRepository(
  userId: string,
  roleIds: string[],
  assignedBy: string,
) {
  if (roleIds.length === 0) return;

  await prisma.userRole.createMany({
    data: roleIds.map((roleId) => ({
      userId,
      roleId,
      assignedBy,
    })),
    skipDuplicates: true,
  });
}
