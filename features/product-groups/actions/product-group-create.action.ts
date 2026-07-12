"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { productGroupCreateSchema } from "../schemas/product-group-create.schema";
import { productGroupCreateService } from "../services/product-group-create.service";

export async function productGroupCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof productGroupCreateService>>>> {
  await requireSessionUserId();

  const parsed = productGroupCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid product group data" };
  }

  return runAction(() => productGroupCreateService(parsed.data));
}
