"use server";

import { requireSessionUserId } from "@/lib/require-session";

import {
  permissionModuleDeleteSchema,
  permissionModuleUpdateSchema,
} from "../schemas/permission-module-create.schema";
import { permissionModuleUpdateService } from "../services/permission-module-update.service";

export async function permissionModuleUpdateAction(input: unknown) {
  await requireSessionUserId();

  const parsed = permissionModuleUpdateSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    throw new Error(first ?? "Invalid module data");
  }

  return permissionModuleUpdateService(parsed.data);
}

export async function permissionModuleGetByIdAction(input: unknown) {
  await requireSessionUserId();

  const parsed = permissionModuleDeleteSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid module id");
  }

  const { permissionModuleGetByIdService } = await import(
    "../services/permission-module-get-by-id.service"
  );

  return permissionModuleGetByIdService(parsed.data.id);
}
