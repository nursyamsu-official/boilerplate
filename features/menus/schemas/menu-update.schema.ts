import { z } from "zod";

import { menuFormFieldsSchema } from "./menu-create.schema";

export const menuUpdateSchema = menuFormFieldsSchema.extend({
  id: z.string().uuid("Menu id is invalid"),
});

export type MenuUpdateInput = z.infer<typeof menuUpdateSchema>;
