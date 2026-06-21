"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  userDeleteSchema,
  userSetStatusSchema,
} from "../schemas/user-create.schema";
import { userDeleteService } from "../services/user-delete.service";
import { userSetStatusService } from "../services/user-set-status.service";

export async function userDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof userDeleteService>>>> {
  await requireSessionUserId();

  const parsed = userDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid user id" };
  }

  return runAction(() => userDeleteService(parsed.data.id));
}

export async function userSetStatusAction(input: unknown) {
  const adminId = await requireSessionUserId();

  const parsed = userSetStatusSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid status data");
  }

  return userSetStatusService(parsed.data, adminId);
}
