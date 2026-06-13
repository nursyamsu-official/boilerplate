import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import type { UserCreateInput } from "../schemas/user-create.schema";
import {
  userAssignRolesRepository,
  userGetByEmailRepository,
  userGetByUsernameRepository,
  userUpdateAfterSignupRepository,
} from "../repositories/user-create.repository";

export async function userCreateService(
  input: UserCreateInput,
  createdBy: string,
) {
  const existingEmail = await userGetByEmailRepository(input.email);
  if (existingEmail) {
    throw new Error("Email already exists");
  }

  if (input.username) {
    const existingUsername = await userGetByUsernameRepository(input.username);
    if (existingUsername) {
      throw new Error("Username already exists");
    }
  }

  const signUpResult = await auth.api.signUpEmail({
    body: {
      name: input.name,
      email: input.email,
      password: input.password,
    },
    headers: await headers(),
  });

  const userId = signUpResult.user?.id;
  if (!userId) {
    throw new Error("Failed to create user");
  }

  const user = await userUpdateAfterSignupRepository(
    userId,
    {
      username: input.username,
      phoneNumber: input.phoneNumber,
      status: input.status,
    },
    createdBy,
  );

  await userAssignRolesRepository(userId, input.roleIds, createdBy);

  return user;
}
