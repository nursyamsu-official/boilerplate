"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { documentTypeDeleteSchema } from "../schemas/document-type-create.schema";
import { documentTypeDeleteService } from "../services/document-type-delete.service";
import { documentTypeToggleStatusService } from "../services/document-type-update.service";

export async function documentTypeDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof documentTypeDeleteService>>>> {
  await requireSessionUserId();

  const parsed = documentTypeDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid document type id" };
  }

  return runAction(() => documentTypeDeleteService(parsed.data.id));
}

export async function documentTypeToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = documentTypeDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid document type id");
  }

  return documentTypeToggleStatusService(parsed.data.id);
}
