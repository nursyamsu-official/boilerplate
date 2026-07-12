"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  companyDeleteSchema,
  companyUpdateSchema,
} from "../schemas/company-create.schema";
import { companyUpdateService } from "../services/company-update.service";

export async function companyUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof companyUpdateService>>>> {
  await requireSessionUserId();

  const parsed = companyUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid company data" };
  }

  return runAction(() => companyUpdateService(parsed.data));
}

export async function companyGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = companyDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid company id");
  }

  const { companyGetByIdService } = await import(
    "../services/company-get-by-id.service"
  );

  return companyGetByIdService(parsed.data.id);
}
