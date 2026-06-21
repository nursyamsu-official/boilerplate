"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { userCreateSchema } from "../schemas/user-create.schema";
import { userCreateService } from "../services/user-create.service";

export async function userCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof userCreateService>>>> {
  const adminId = await requireSessionUserId();

  const parsed = userCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid user data" };
  }

  return runAction(() => userCreateService(parsed.data, adminId));
}
