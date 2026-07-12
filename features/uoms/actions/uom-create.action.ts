"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { uomCreateSchema } from "../schemas/uom-create.schema";
import { uomCreateService } from "../services/uom-create.service";

export async function uomCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof uomCreateService>>>> {
  await requireSessionUserId();

  const parsed = uomCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid UOM data" };
  }

  return runAction(() => uomCreateService(parsed.data));
}
