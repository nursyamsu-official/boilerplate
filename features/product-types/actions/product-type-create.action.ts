"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { productTypeCreateSchema } from "../schemas/product-type-create.schema";
import { productTypeCreateService } from "../services/product-type-create.service";

export async function productTypeCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof productTypeCreateService>>>> {
  await requireSessionUserId();

  const parsed = productTypeCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid product type data" };
  }

  return runAction(() => productTypeCreateService(parsed.data));
}
