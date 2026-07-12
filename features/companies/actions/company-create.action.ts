"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { companyCreateSchema } from "../schemas/company-create.schema";
import { companyCreateService } from "../services/company-create.service";

export async function companyCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof companyCreateService>>>> {
  await requireSessionUserId();

  const parsed = companyCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid company data" };
  }

  return runAction(() => companyCreateService(parsed.data));
}
