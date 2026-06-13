"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { twoFactorDisableSchema } from "../schemas/two-factor-filter.schema";
import { twoFactorDisableService } from "../services/two-factor-disable.service";

export async function twoFactorDisableAction(input: unknown) {
  const actorId = await requireSessionUserId();

  const parsed = twoFactorDisableSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid user id");
  }

  return twoFactorDisableService(parsed.data.userId, actorId);
}
