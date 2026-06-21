"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { webhookDeleteSchema } from "../schemas/webhook-create.schema";
import { webhookDeleteService } from "../services/webhook-delete.service";
import { webhookToggleStatusService } from "../services/webhook-update.service";

export async function webhookDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof webhookDeleteService>>>> {
  await requireSessionUserId();

  const parsed = webhookDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid webhook id" };
  }

  return runAction(() => webhookDeleteService(parsed.data.id));
}

export async function webhookToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = webhookDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid webhook id");
  }

  return webhookToggleStatusService(parsed.data.id);
}
