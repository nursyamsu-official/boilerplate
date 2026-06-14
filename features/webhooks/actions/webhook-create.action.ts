"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { webhookCreateSchema } from "../schemas/webhook-create.schema";
import { webhookCreateService } from "../services/webhook-create.service";

export async function webhookCreateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = webhookCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid webhook data");
  }

  return webhookCreateService(parsed.data);
}
