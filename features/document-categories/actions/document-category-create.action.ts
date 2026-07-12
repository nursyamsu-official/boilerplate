"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { documentCategoryCreateSchema } from "../schemas/document-category-create.schema";
import { documentCategoryCreateService } from "../services/document-category-create.service";

export async function documentCategoryCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof documentCategoryCreateService>>>> {
  await requireSessionUserId();

  const parsed = documentCategoryCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid category data" };
  }

  return runAction(() => documentCategoryCreateService(parsed.data));
}
