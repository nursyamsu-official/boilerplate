"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  purchasingGroupDeleteSchema,
  purchasingGroupGetParentOptionsSchema,
  purchasingGroupToggleStatusSchema,
} from "../schemas/purchasing-group-create.schema";
import { purchasingGroupDeleteService } from "../services/purchasing-group-delete.service";
import { purchasingGroupGetParentOptionsService } from "../services/purchasing-group-get-by-id.service";
import { purchasingGroupToggleStatusService } from "../services/purchasing-group-update.service";
import type { PurchasingGroupParentOption } from "../types/purchasing-group.type";

export async function purchasingGroupDeleteAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof purchasingGroupDeleteService>>>
> {
  await requireSessionUserId();

  const parsed = purchasingGroupDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid Purchasing Group id" };
  }

  return runAction(() => purchasingGroupDeleteService(parsed.data.id));
}

export async function purchasingGroupToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = purchasingGroupToggleStatusSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid Purchasing Group id");
  }

  return purchasingGroupToggleStatusService(parsed.data.id);
}

export async function purchasingGroupGetParentOptionsAction(
  input: unknown,
): Promise<PurchasingGroupParentOption[]> {
  await requireSessionUserId();

  const parsed = purchasingGroupGetParentOptionsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid parent options request");
  }

  return purchasingGroupGetParentOptionsService(
    parsed.data.companyId,
    parsed.data.excludeUnitId,
  );
}
