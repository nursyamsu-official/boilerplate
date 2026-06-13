"use server";

import { requireSessionUserId } from "@/lib/require-session";

import { permissionModuleCreateSchema } from "../schemas/permission-module-create.schema";
import { permissionModuleCreateService } from "../services/permission-module-create.service";

export async function permissionModuleCreateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = permissionModuleCreateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid module data");
  }

  return permissionModuleCreateService(parsed.data);
}
