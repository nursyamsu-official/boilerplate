"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { roleCreateSchema } from "../schemas/role-create.schema";
import { roleCreateService } from "../services/role-create.service";

export async function roleCreateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = roleCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid role data");
  }

  return roleCreateService(parsed.data);
}
