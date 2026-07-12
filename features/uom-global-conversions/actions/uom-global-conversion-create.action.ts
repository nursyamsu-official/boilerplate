"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { uomGlobalConversionCreateSchema } from "../schemas/uom-global-conversion-create.schema";
import { uomGlobalConversionCreateService } from "../services/uom-global-conversion-create.service";

export async function uomGlobalConversionCreateAction(
  input: unknown,
): Promise<
  ActionResult<Awaited<ReturnType<typeof uomGlobalConversionCreateService>>>
> {
  await requireSessionUserId();

  const parsed = uomGlobalConversionCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid conversion data" };
  }

  return runAction(() => uomGlobalConversionCreateService(parsed.data));
}
