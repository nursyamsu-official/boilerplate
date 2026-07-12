"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  logisticUnitGetByIdSchema,
  logisticUnitUpdateSchema,
} from "../schemas/logistic-unit-create.schema";
import { logisticUnitGetByIdService } from "../services/logistic-unit-get-by-id.service";
import { logisticUnitUpdateService } from "../services/logistic-unit-update.service";
import type { LogisticUnitDetail } from "../types/logistic-unit.type";

export async function logisticUnitUpdateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof logisticUnitUpdateService>>>
> {
  await requireSessionUserId();

  const parsed = logisticUnitUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid Logistic Unit data" };
  }

  return runAction(() => logisticUnitUpdateService(parsed.data));
}

export async function logisticUnitGetByIdAction(
  input: unknown,
): Promise<LogisticUnitDetail> {
  await requireSessionUserId();

  const parsed = logisticUnitGetByIdSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid Logistic Unit id");
  }

  return logisticUnitGetByIdService(parsed.data.id);
}
