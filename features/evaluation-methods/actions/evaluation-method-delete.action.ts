"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { evaluationMethodDeleteSchema } from "../schemas/evaluation-method-create.schema";
import { evaluationMethodDeleteService } from "../services/evaluation-method-delete.service";
import { evaluationMethodToggleStatusService } from "../services/evaluation-method-update.service";

export async function evaluationMethodDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof evaluationMethodDeleteService>>>> {
  await requireSessionUserId();

  const parsed = evaluationMethodDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid evaluation method id" };
  }

  return runAction(() => evaluationMethodDeleteService(parsed.data.id));
}

export async function evaluationMethodToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = evaluationMethodDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid evaluation method id");
  }

  return evaluationMethodToggleStatusService(parsed.data.id);
}
