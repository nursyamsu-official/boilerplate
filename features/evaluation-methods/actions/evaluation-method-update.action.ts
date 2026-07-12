"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  evaluationMethodDeleteSchema,
  evaluationMethodUpdateSchema,
} from "../schemas/evaluation-method-create.schema";
import { evaluationMethodUpdateService } from "../services/evaluation-method-update.service";

export async function evaluationMethodUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof evaluationMethodUpdateService>>>> {
  await requireSessionUserId();

  const parsed = evaluationMethodUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid evaluation method data" };
  }

  return runAction(() => evaluationMethodUpdateService(parsed.data));
}

export async function evaluationMethodGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = evaluationMethodDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid evaluation method id");
  }

  const { evaluationMethodGetByIdService } = await import(
    "../services/evaluation-method-get-by-id.service"
  );

  return evaluationMethodGetByIdService(parsed.data.id);
}
