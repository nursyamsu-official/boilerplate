"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { productCategoryCreateSchema } from "../schemas/product-category-create.schema";
import { productCategoryCreateService } from "../services/product-category-create.service";

export async function productCategoryCreateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof productCategoryCreateService>>>> {
  await requireSessionUserId();

  const parsed = productCategoryCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid product category data" };
  }

  return runAction(() => productCategoryCreateService(parsed.data));
}
