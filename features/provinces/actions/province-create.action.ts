"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { provinceCreateSchema } from "../schemas/province-create.schema";
import { provinceCreateService } from "../services/province-create.service";

export async function provinceCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof provinceCreateService>>>> {
  await requireSessionUserId();

  const parsed = provinceCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid province data" };
  }

  return runAction(() => provinceCreateService(parsed.data));
}
