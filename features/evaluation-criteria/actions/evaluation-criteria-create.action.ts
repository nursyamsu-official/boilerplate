"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { evaluationCriteriaCreateSchema } from "../schemas/evaluation-criteria-create.schema";
import { evaluationCriteriaCreateService } from "../services/evaluation-criteria-create.service";

export async function evaluationCriteriaCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof evaluationCriteriaCreateService>>>> {
  await requireSessionUserId();

  const parsed = evaluationCriteriaCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid evaluation criterion data" };
  }

  return runAction(() => evaluationCriteriaCreateService(parsed.data));
}
