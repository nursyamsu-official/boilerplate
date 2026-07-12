"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { districtCreateSchema } from "../schemas/district-create.schema";
import { districtCreateService } from "../services/district-create.service";

export async function districtCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof districtCreateService>>>> {
  await requireSessionUserId();

  const parsed = districtCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid district data" };
  }

  return runAction(() => districtCreateService(parsed.data));
}
