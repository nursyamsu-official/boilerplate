"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { uomDeleteSchema } from "../schemas/uom-create.schema";
import { uomDeleteService } from "../services/uom-delete.service";
import { uomToggleStatusService } from "../services/uom-update.service";

export async function uomDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof uomDeleteService>>>> {
  await requireSessionUserId();

  const parsed = uomDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid UOM id" };
  }

  return runAction(() => uomDeleteService(parsed.data.id));
}

export async function uomToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = uomDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid UOM id");
  }

  return uomToggleStatusService(parsed.data.id);
}
