"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { productCreateSchema } from "../schemas/product-create.schema";
import { productCreateService } from "../services/product-create.service";

export async function productCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof productCreateService>>>> {
  await requireSessionUserId();

  const parsed = productCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid product data" };
  }

  return runAction(() => productCreateService(parsed.data));
}
