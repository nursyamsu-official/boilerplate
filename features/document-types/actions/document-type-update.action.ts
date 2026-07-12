"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  documentTypeDeleteSchema,
  documentTypeUpdateSchema,
} from "../schemas/document-type-create.schema";
import { documentTypeUpdateService } from "../services/document-type-update.service";

export async function documentTypeUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof documentTypeUpdateService>>>> {
  await requireSessionUserId();

  const parsed = documentTypeUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid document type data" };
  }

  return runAction(() => documentTypeUpdateService(parsed.data));
}

export async function documentTypeGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = documentTypeDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid document type id");
  }

  const { documentTypeGetByIdService } = await import(
    "../services/document-type-get-by-id.service"
  );

  return documentTypeGetByIdService(parsed.data.id);
}
