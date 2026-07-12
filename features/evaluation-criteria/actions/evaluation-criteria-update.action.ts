"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  evaluationCriteriaDeleteSchema,
  evaluationCriteriaUpdateSchema,
} from "../schemas/evaluation-criteria-create.schema";
import { evaluationCriteriaUpdateService } from "../services/evaluation-criteria-update.service";

export async function evaluationCriteriaUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof evaluationCriteriaUpdateService>>>> {
  await requireSessionUserId();

  const parsed = evaluationCriteriaUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid evaluation criterion data" };
  }

  return runAction(() => evaluationCriteriaUpdateService(parsed.data));
}

export async function evaluationCriteriaGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = evaluationCriteriaDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid evaluation criterion id");
  }

  const { evaluationCriteriaGetByIdService } = await import(
    "../services/evaluation-criteria-get-by-id.service"
  );

  return evaluationCriteriaGetByIdService(parsed.data.id);
}
