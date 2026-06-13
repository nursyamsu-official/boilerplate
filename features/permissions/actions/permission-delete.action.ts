"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { permissionDeleteSchema } from "../schemas/permission-create.schema";
import { permissionDeleteService } from "../services/permission-delete.service";

export async function permissionDeleteAction(input: unknown) {
  await requireSessionUserId();

  const parsed = permissionDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid permission id");
  }

  return permissionDeleteService(parsed.data.id);
}
