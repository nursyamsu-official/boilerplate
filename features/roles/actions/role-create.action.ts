"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { roleCreateSchema } from "../schemas/role-create.schema";
import { roleCreateService } from "../services/role-create.service";

export async function roleCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof roleCreateService>>>> {
  await requireSessionUserId();

  const parsed = roleCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid role data" };
  }

  return runAction(() => roleCreateService(parsed.data));
}
