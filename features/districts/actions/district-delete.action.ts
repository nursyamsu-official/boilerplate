"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { districtDeleteSchema } from "../schemas/district-create.schema";
import { districtDeleteService } from "../services/district-delete.service";
import { districtToggleStatusService } from "../services/district-update.service";

export async function districtDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof districtDeleteService>>>> {
  await requireSessionUserId();

  const parsed = districtDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid district id" };
  }

  return runAction(() => districtDeleteService(parsed.data.id));
}

export async function districtToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = districtDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid district id");
  }

  return districtToggleStatusService(parsed.data.id);
}
