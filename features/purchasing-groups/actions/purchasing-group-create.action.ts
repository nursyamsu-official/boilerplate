"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { purchasingGroupCreateSchema } from "../schemas/purchasing-group-create.schema";
import { purchasingGroupCreateService } from "../services/purchasing-group-create.service";

export async function purchasingGroupCreateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof purchasingGroupCreateService>>>
> {
  await requireSessionUserId();

  const parsed = purchasingGroupCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid purchasing group data" };
  }

  return runAction(() => purchasingGroupCreateService(parsed.data));
}
