import type { UserUpdateInput } from "../schemas/user-create.schema";
import {
  userGetByEmailRepository,
  userGetByUsernameRepository,
} from "../repositories/user-create.repository";
import {
  userGetByIdRepository,
  userUpdateRepository,
} from "../repositories/user-update.repository";

export async function userUpdateService(
  input: UserUpdateInput,
  assignedBy: string,
) {
  const user = await userGetByIdRepository(input.id);
  if (!user) {
    throw new Error("User not found");
  }

  const existingEmail = await userGetByEmailRepository(input.email);
  if (existingEmail && existingEmail.id !== input.id) {
    throw new Error("Email already exists");
  }

  if (input.username) {
    const existingUsername = await userGetByUsernameRepository(input.username);
    if (existingUsername && existingUsername.id !== input.id) {
      throw new Error("Username already exists");
    }
  }

  return userUpdateRepository(input, assignedBy);
}
