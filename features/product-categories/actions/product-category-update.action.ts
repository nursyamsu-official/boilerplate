"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  productCategoryDeleteSchema,
  productCategoryUpdateSchema,
} from "../schemas/product-category-create.schema";
import { productCategoryUpdateService } from "../services/product-category-update.service";

export async function productCategoryUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof productCategoryUpdateService>>>> {
  await requireSessionUserId();

  const parsed = productCategoryUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid product category data" };
  }

  return runAction(() => productCategoryUpdateService(parsed.data));
}

export async function productCategoryGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = productCategoryDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid product category id");
  }

  const { productCategoryGetByIdService } = await import(
    "../services/product-category-get-by-id.service"
  );

  return productCategoryGetByIdService(parsed.data.id);
}
