"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { evaluationMethodCreateSchema } from "../schemas/evaluation-method-create.schema";
import { evaluationMethodCreateService } from "../services/evaluation-method-create.service";

export async function evaluationMethodCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof evaluationMethodCreateService>>>> {
  await requireSessionUserId();

  const parsed = evaluationMethodCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid evaluation method data" };
  }

  return runAction(() => evaluationMethodCreateService(parsed.data));
}
