"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { webhookCreateSchema } from "../schemas/webhook-create.schema";
import { webhookCreateService } from "../services/webhook-create.service";

export async function webhookCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof webhookCreateService>>>> {
  await requireSessionUserId();

  const parsed = webhookCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid webhook data" };
  }

  return runAction(() => webhookCreateService(parsed.data));
}
