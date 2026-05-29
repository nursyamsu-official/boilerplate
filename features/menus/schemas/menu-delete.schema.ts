import { z } from "zod";

export const menuDeleteSchema = z.object({
  id: z.string().uuid("Menu id is invalid"),
});

export type MenuDeleteInput = z.infer<typeof menuDeleteSchema>;

export const menuToggleStatusSchema = menuDeleteSchema;

export type MenuToggleStatusInput = z.infer<typeof menuToggleStatusSchema>;

export const menuGetByIdSchema = menuDeleteSchema;

export type MenuGetByIdInput = z.infer<typeof menuGetByIdSchema>;
