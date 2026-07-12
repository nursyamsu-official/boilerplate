"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { evaluationScoringMethodDeleteSchema } from "../schemas/evaluation-scoring-method-create.schema";
import { evaluationScoringMethodDeleteService } from "../services/evaluation-scoring-method-delete.service";
import { evaluationScoringMethodToggleStatusService } from "../services/evaluation-scoring-method-update.service";

export async function evaluationScoringMethodDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof evaluationScoringMethodDeleteService>>>> {
  await requireSessionUserId();

  const parsed = evaluationScoringMethodDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid scoring method id" };
  }

  return runAction(() => evaluationScoringMethodDeleteService(parsed.data.id));
}

export async function evaluationScoringMethodToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = evaluationScoringMethodDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid scoring method id");
  }

  return evaluationScoringMethodToggleStatusService(parsed.data.id);
}
