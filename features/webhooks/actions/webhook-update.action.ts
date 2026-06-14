"use server";

import { requireSessionUserId } from "@/lib/require-session";

import {
  webhookDeleteSchema,
  webhookUpdateSchema,
} from "../schemas/webhook-create.schema";
import { webhookGetByIdService } from "../services/webhook-get-by-id.service";
import { webhookUpdateService } from "../services/webhook-update.service";

export async function webhookUpdateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = webhookUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid webhook data");
  }

  return webhookUpdateService(parsed.data);
}

export async function webhookGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = webhookDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid webhook id");
  }

  return webhookGetByIdService(parsed.data.id);
}
