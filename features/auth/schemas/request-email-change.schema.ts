import { z } from "zod";

export const requestEmailChangeSchema = z.object({
  newEmail: z.string().email("Please enter a valid email address"),
});

export type RequestEmailChangeInput = z.infer<typeof requestEmailChangeSchema>;
