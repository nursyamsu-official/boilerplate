"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { evaluationCriteriaDeleteSchema } from "../schemas/evaluation-criteria-create.schema";
import { evaluationCriteriaDeleteService } from "../services/evaluation-criteria-delete.service";
import { evaluationCriteriaToggleStatusService } from "../services/evaluation-criteria-update.service";

export async function evaluationCriteriaDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof evaluationCriteriaDeleteService>>>> {
  await requireSessionUserId();

  const parsed = evaluationCriteriaDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid evaluation criterion id" };
  }

  return runAction(() => evaluationCriteriaDeleteService(parsed.data.id));
}

export async function evaluationCriteriaToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = evaluationCriteriaDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid evaluation criterion id");
  }

  return evaluationCriteriaToggleStatusService(parsed.data.id);
}
