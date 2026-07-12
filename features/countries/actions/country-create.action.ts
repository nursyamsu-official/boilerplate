"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { countryCreateSchema } from "../schemas/country-create.schema";
import { countryCreateService } from "../services/country-create.service";

export async function countryCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof countryCreateService>>>> {
  await requireSessionUserId();

  const parsed = countryCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid country data" };
  }

  return runAction(() => countryCreateService(parsed.data));
}
