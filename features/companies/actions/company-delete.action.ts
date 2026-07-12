"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { companyDeleteSchema } from "../schemas/company-create.schema";
import { companyDeleteService } from "../services/company-delete.service";
import { companyToggleStatusService } from "../services/company-update.service";

export async function companyDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof companyDeleteService>>>> {
  await requireSessionUserId();

  const parsed = companyDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid company id" };
  }

  return runAction(() => companyDeleteService(parsed.data.id));
}

export async function companyToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = companyDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid company id");
  }

  return companyToggleStatusService(parsed.data.id);
}
