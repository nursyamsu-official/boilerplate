"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  documentCategoryDeleteSchema,
  documentCategoryUpdateSchema,
} from "../schemas/document-category-create.schema";
import { documentCategoryUpdateService } from "../services/document-category-update.service";

export async function documentCategoryUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof documentCategoryUpdateService>>>> {
  await requireSessionUserId();

  const parsed = documentCategoryUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid category data" };
  }

  return runAction(() => documentCategoryUpdateService(parsed.data));
}

export async function documentCategoryGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = documentCategoryDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid category id");
  }

  const { documentCategoryGetByIdService } = await import(
    "../services/document-category-get-by-id.service"
  );

  return documentCategoryGetByIdService(parsed.data.id);
}
