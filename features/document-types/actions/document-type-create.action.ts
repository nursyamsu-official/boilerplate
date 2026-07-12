"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { documentTypeCreateSchema } from "../schemas/document-type-create.schema";
import { documentTypeCreateService } from "../services/document-type-create.service";

export async function documentTypeCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof documentTypeCreateService>>>> {
  await requireSessionUserId();

  const parsed = documentTypeCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid document type data" };
  }

  return runAction(() => documentTypeCreateService(parsed.data));
}
