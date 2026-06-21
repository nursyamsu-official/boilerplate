"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  userDeleteSchema,
  userUpdateSchema,
} from "../schemas/user-create.schema";
import { userGetByIdService } from "../services/user-get-by-id.service";
import { userUpdateService } from "../services/user-update.service";

export async function userUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof userUpdateService>>>> {
  const adminId = await requireSessionUserId();

  const parsed = userUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid user data" };
  }

  return runAction(() => userUpdateService(parsed.data, adminId));
}

export async function userGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = userDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid user id");
  }

  return userGetByIdService(parsed.data.id);
}
