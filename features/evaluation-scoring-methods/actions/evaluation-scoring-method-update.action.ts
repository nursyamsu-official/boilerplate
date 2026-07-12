"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  evaluationScoringMethodDeleteSchema,
  evaluationScoringMethodUpdateSchema,
} from "../schemas/evaluation-scoring-method-create.schema";
import { evaluationScoringMethodUpdateService } from "../services/evaluation-scoring-method-update.service";

export async function evaluationScoringMethodUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof evaluationScoringMethodUpdateService>>>> {
  await requireSessionUserId();

  const parsed = evaluationScoringMethodUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid scoring method data" };
  }

  return runAction(() => evaluationScoringMethodUpdateService(parsed.data));
}

export async function evaluationScoringMethodGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = evaluationScoringMethodDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid scoring method id");
  }

  const { evaluationScoringMethodGetByIdService } = await import(
    "../services/evaluation-scoring-method-get-by-id.service"
  );

  return evaluationScoringMethodGetByIdService(parsed.data.id);
}
