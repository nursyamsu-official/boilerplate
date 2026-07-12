"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { logisticUnitCreateSchema } from "../schemas/logistic-unit-create.schema";
import { logisticUnitCreateService } from "../services/logistic-unit-create.service";

export async function logisticUnitCreateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof logisticUnitCreateService>>>
> {
  await requireSessionUserId();

  const parsed = logisticUnitCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid logistic unit data" };
  }

  return runAction(() => logisticUnitCreateService(parsed.data));
}
