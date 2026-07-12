"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { provinceDeleteSchema } from "../schemas/province-create.schema";
import { provinceDeleteService } from "../services/province-delete.service";
import { provinceToggleStatusService } from "../services/province-update.service";

export async function provinceDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof provinceDeleteService>>>> {
  await requireSessionUserId();

  const parsed = provinceDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid province id" };
  }

  return runAction(() => provinceDeleteService(parsed.data.id));
}

export async function provinceToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = provinceDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid province id");
  }

  return provinceToggleStatusService(parsed.data.id);
}
