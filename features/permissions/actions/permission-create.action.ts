"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { permissionCreateSchema } from "../schemas/permission-create.schema";
import { permissionCreateService } from "../services/permission-create.service";

export async function permissionCreateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = permissionCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid permission data");
  }

  return permissionCreateService(parsed.data);
}
