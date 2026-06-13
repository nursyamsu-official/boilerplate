import { userGetByIdRepository } from "../repositories/user-update.repository";
import { userDeleteRepository } from "../repositories/user-delete.repository";

export async function userDeleteService(id: string) {
  const user = await userGetByIdRepository(id);
  if (!user) {
    throw new Error("User not found");
  }

  return userDeleteRepository(id);
}
