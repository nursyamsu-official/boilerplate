"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { evaluationTemplateCreateSchema } from "../schemas/evaluation-template-create.schema";
import { evaluationTemplateCreateService } from "../services/evaluation-template-create.service";

export async function evaluationTemplateCreateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof evaluationTemplateCreateService>>>
> {
  await requireSessionUserId();

  const parsed = evaluationTemplateCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid evaluation template data" };
  }

  return runAction(() => evaluationTemplateCreateService(parsed.data));
}
