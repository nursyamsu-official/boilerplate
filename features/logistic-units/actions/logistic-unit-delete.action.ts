"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  logisticUnitDeleteSchema,
  logisticUnitGetParentOptionsSchema,
  logisticUnitToggleStatusSchema,
} from "../schemas/logistic-unit-create.schema";
import { logisticUnitDeleteService } from "../services/logistic-unit-delete.service";
import { logisticUnitGetParentOptionsService } from "../services/logistic-unit-get-by-id.service";
import { logisticUnitToggleStatusService } from "../services/logistic-unit-update.service";
import type { LogisticUnitParentOption } from "../types/logistic-unit.type";

export async function logisticUnitDeleteAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof logisticUnitDeleteService>>>
> {
  await requireSessionUserId();

  const parsed = logisticUnitDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid Logistic Unit id" };
  }

  return runAction(() => logisticUnitDeleteService(parsed.data.id));
}

export async function logisticUnitToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = logisticUnitToggleStatusSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid Logistic Unit id");
  }

  return logisticUnitToggleStatusService(parsed.data.id);
}

export async function logisticUnitGetParentOptionsAction(
  input: unknown,
): Promise<LogisticUnitParentOption[]> {
  await requireSessionUserId();

  const parsed = logisticUnitGetParentOptionsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid parent options request");
  }

  return logisticUnitGetParentOptionsService(
    parsed.data.companyId,
    parsed.data.excludeUnitId,
  );
}
