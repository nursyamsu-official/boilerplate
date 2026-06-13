"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { userCreateSchema } from "../schemas/user-create.schema";
import { userCreateService } from "../services/user-create.service";

export async function userCreateAction(input: unknown) {
  const adminId = await requireSessionUserId();

  const parsed = userCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid user data");
  }

  return userCreateService(parsed.data, adminId);
}
