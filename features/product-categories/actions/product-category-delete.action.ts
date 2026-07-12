"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import { productCategoryDeleteSchema } from "../schemas/product-category-create.schema";
import { productCategoryDeleteService } from "../services/product-category-delete.service";
import { productCategoryToggleStatusService } from "../services/product-category-update.service";

export async function productCategoryDeleteAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof productCategoryDeleteService>>>> {
  await requireSessionUserId();

  const parsed = productCategoryDeleteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid product category id" };
  }

  return runAction(() => productCategoryDeleteService(parsed.data.id));
}

export async function productCategoryToggleStatusAction(input: unknown) {
  await requireSessionUserId();

  const parsed = productCategoryDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid product category id");
  }

  return productCategoryToggleStatusService(parsed.data.id);
}
