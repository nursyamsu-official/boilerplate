"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { documentCategoryDeleteSchema } from "../schemas/document-category-create.schema";
import { documentCategoryDeleteService } from "../services/document-category-delete.service";
import { documentCategoryToggleStatusService } from "../services/document-category-update.service";

export async function documentCategoryDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof documentCategoryDeleteService>>>> {
  await requireSessionUserId();

  const parsed = documentCategoryDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid category id" };
  }

  return runAction(() => documentCategoryDeleteService(parsed.data.id));
}

export async function documentCategoryToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = documentCategoryDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid category id");
  }

  return documentCategoryToggleStatusService(parsed.data.id);
}
