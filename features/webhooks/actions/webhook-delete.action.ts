"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { webhookDeleteSchema } from "../schemas/webhook-create.schema";
import { webhookDeleteService } from "../services/webhook-delete.service";
import { webhookToggleStatusService } from "../services/webhook-update.service";

export async function webhookDeleteAction(input: unknown) {
  await requireSessionUserId();

  const parsed = webhookDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid webhook id");
  }

  return webhookDeleteService(parsed.data.id);
}

export async function webhookToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = webhookDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid webhook id");
  }

  return webhookToggleStatusService(parsed.data.id);
}
