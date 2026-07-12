"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { evaluationScoringMethodCreateSchema } from "../schemas/evaluation-scoring-method-create.schema";
import { evaluationScoringMethodCreateService } from "../services/evaluation-scoring-method-create.service";

export async function evaluationScoringMethodCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof evaluationScoringMethodCreateService>>>> {
  await requireSessionUserId();

  const parsed = evaluationScoringMethodCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid scoring method data" };
  }

  return runAction(() => evaluationScoringMethodCreateService(parsed.data));
}
