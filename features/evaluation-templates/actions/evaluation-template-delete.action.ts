"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { evaluationTemplateDeleteSchema } from "../schemas/evaluation-template-create.schema";
import { evaluationTemplateDeleteService } from "../services/evaluation-template-delete.service";
import { evaluationTemplateToggleStatusService } from "../services/evaluation-template-update.service";

export async function evaluationTemplateDeleteAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof evaluationTemplateDeleteService>>>
> {
  await requireSessionUserId();

  const parsed = evaluationTemplateDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid evaluation template id" };
  }

  return runAction(() => evaluationTemplateDeleteService(parsed.data.id));
}

export async function evaluationTemplateToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = evaluationTemplateDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid evaluation template id");
  }

  return evaluationTemplateToggleStatusService(parsed.data.id);
}
