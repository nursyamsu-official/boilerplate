"use server";

import { runAction, type ActionResult } from "@/lib/action-result";
import { requireSessionUserId } from "@/lib/require-session";

import {
  productDeleteSchema,
  productUpdateSchema,
} from "../schemas/product-create.schema";
import { productUpdateService } from "../services/product-update.service";

export async function productUpdateAction(
  input: unknown,
): Promise<ActionResult<Awaited<ReturnType<typeof productUpdateService>>>> {
  await requireSessionUserId();

  const parsed = productUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Invalid product data" };
  }

  return runAction(() => productUpdateService(parsed.data));
}

export async function productGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = productDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid product id");
  }

  const { productGetByIdService } = await import(
    "../services/product-get-by-id.service"
  );

  return productGetByIdService(parsed.data.id);
}
