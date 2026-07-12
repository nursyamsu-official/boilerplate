"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  purchasingGroupGetByIdSchema,
  purchasingGroupUpdateSchema,
} from "../schemas/purchasing-group-create.schema";
import { purchasingGroupGetByIdService } from "../services/purchasing-group-get-by-id.service";
import { purchasingGroupUpdateService } from "../services/purchasing-group-update.service";
import type { PurchasingGroupDetail } from "../types/purchasing-group.type";

export async function purchasingGroupUpdateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof purchasingGroupUpdateService>>>
> {
  await requireSessionUserId();

  const parsed = purchasingGroupUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid Purchasing Group data" };
  }

  return runAction(() => purchasingGroupUpdateService(parsed.data));
}

export async function purchasingGroupGetByIdAction(
  input: unknown,
): Promise<PurchasingGroupDetail> {
  await requireSessionUserId();

  const parsed = purchasingGroupGetByIdSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid Purchasing Group id");
  }

  return purchasingGroupGetByIdService(parsed.data.id);
}
