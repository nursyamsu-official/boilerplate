"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  evaluationTemplateDeleteSchema,
  evaluationTemplateUpdateSchema,
} from "../schemas/evaluation-template-create.schema";
import { evaluationTemplateUpdateService } from "../services/evaluation-template-update.service";

export async function evaluationTemplateUpdateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof evaluationTemplateUpdateService>>>
> {
  await requireSessionUserId();

  const parsed = evaluationTemplateUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid evaluation template data" };
  }

  return runAction(() => evaluationTemplateUpdateService(parsed.data));
}

export async function evaluationTemplateGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = evaluationTemplateDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid evaluation template id");
  }

  const { evaluationTemplateGetByIdService } = await import(
    "../services/evaluation-template-get-by-id.service"
  );

  return evaluationTemplateGetByIdService(parsed.data.id);
}
