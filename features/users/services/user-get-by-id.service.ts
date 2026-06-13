import { userGetByIdRepository } from "../repositories/user-update.repository";
import type { UserDetail } from "../types/user.type";

export async function userGetByIdService(id: string): Promise<UserDetail> {
  const user = await userGetByIdRepository(id);
  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    phoneNumber: user.phoneNumber,
    status: user.status,
    roleIds: user.userRoles.map((userRole) => userRole.roleId),
  };
}
