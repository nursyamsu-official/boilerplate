import { z } from "zod";

export const newEmailForChangeSchema = z.object({
  newEmail: z.string().email("Please enter a valid email address"),
});

export type NewEmailForChangeInput = z.infer<typeof newEmailForChangeSchema>;
