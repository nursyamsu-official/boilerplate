import type { UserSetStatusInput } from "../schemas/user-create.schema";
import { userSetStatusRepository } from "../repositories/user-status.repository";
import { userGetByIdRepository } from "../repositories/user-update.repository";

export async function userSetStatusService(
  input: UserSetStatusInput,
  actorId: string,
) {
  const user = await userGetByIdRepository(input.id);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.status === input.status) {
    throw new Error("User already has this status");
  }

  return userSetStatusRepository(input.id, input.status, actorId);
}
